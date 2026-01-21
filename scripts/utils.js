// blob download helper ...
function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadFolderAsZip(folderName, files, images=false) {
  const zip = new JSZip();
  if (images) {
    zip.folder(folderName + "/images/units")
  }
  files.forEach(file => {
    zip.file(`${folderName}/${file.name}`, file.content);
  });

  zip.generateAsync({ type: 'blob' }).then(function(content) {
    downloadBlob(`${folderName}.zip`, content);
  }).catch(err => {
    console.error('Error creating ZIP:', err);
  });
}

// Helper to format a simple key=value pair with proper indentation
function addAttribute(key, value, indent = '    ') {
  if (value === null || value === undefined || value === '') return '';
  
  let formattedValue = value;
  if (typeof value === 'string' && value.includes(' ') && !value.startsWith('_')) {
    formattedValue = `"${value}"`;
  }
  return `${indent}${key}=${formattedValue}\n`;
}

function eraToWesnothString(eras) {
  let result = `#textdomain wesnoth-${selectedMod.name}\n`;
  
  // Process each era
  eras.forEach(era => {
    result += '[era]\n';
    result += addAttribute('id', era.id);
    result += addAttribute('name', `_ "${era.name}"`);
    result += '{RANDOM_SIDE}\n';
    if (era.defaultFactions) {
      result +=`{multiplayer/factions/drakes-default.cfg}
{multiplayer/factions/dunefolk-default.cfg}
{multiplayer/factions/knalgans-default.cfg}
{multiplayer/factions/loyalists-default.cfg}
{multiplayer/factions/northerners-default.cfg}
{multiplayer/factions/rebels-default.cfg}
{multiplayer/factions/undead-default.cfg}\n`
    }
    if (era.defaultAoHFactions) {
      result += `{multiplayer/factions/drakes-aoh.cfg}
{multiplayer/factions/dunefolk-aoh.cfg}
{multiplayer/factions/knalgans-aoh.cfg}
{multiplayer/factions/loyalists-aoh.cfg}
{multiplayer/factions/northerners-aoh.cfg}
{multiplayer/factions/rebels-aoh.cfg}
{multiplayer/factions/undead-aoh.cfg}\n`
    }
    // Process each faction as multiplayer_side
    if (era.factions && era.factions.length > 0) {
      era.factions.forEach(faction => {
        result += '    [multiplayer_side]\n';
        result += addAttribute('id', faction.id, '        ');
        result += addAttribute('name', `_"${faction.name}"`, '        ');
        
        if (faction.image) {
          result += addAttribute('image', `"${faction.image}"`, '        ');
        }
        if (faction.type) {
          result += addAttribute('type', faction.type, '        ');
        }
        if (faction.leaders) {
          result += addAttribute('leader', faction.leaders, '        ');
          result += addAttribute('random_leader', faction.leaders, '        ');
        }
        if (faction.recruits) {
          result += addAttribute('recruit', faction.recruits, '        ');
        }
        
        // AI section
        if (faction.ai) {
          result += '        [ai]\n';
          result += `            recruitment_pattern=${faction.ai}\n`;
          result += '        [/ai]\n';
        }
        
        result += '    [/multiplayer_side]\n';
      });
    }
    if (era.extraAbilities) {
      result += extraAbilities
    }
    result += '[/era]\n';
  });
  
  return result;
}

function qualitiesToWesnothString(qualities) {
  let result = `#textdomain wesnoth-${selectedMod.name}\n[units]\n`;
  
  Object.values(qualities).forEach((quality) => {
    type = quality.type === "mt" ? "movetype" : quality.type
    result += ` [${type}]\n`
    switch (type) {
      case 'movetype':
        result += addAttribute('name', quality.name);
        
        // Movement costs
        if (quality.movementCost && Object.keys(quality.movementCost).length > 0) {
          result += `    [movement_costs]\n     ${quality.movementCost}\n    [/movement_costs]\n`;
        }
        
        // Defense
        if (quality.defense && Object.keys(quality.defense).length > 0) {
          result += `    [defense]\n     ${quality.defense}\n    [/defense]\n`;

        }
        
        // Resistances
        if (quality.resistances && Object.keys(quality.resistances).length > 0) {
          result += `    [resistance]\n     ${quality.resistances}\n    [/resistance]\n`;

        }
        break;
        
      case 'race':
        result += addAttribute('id', quality.id);
        result += addAttribute('name', `_ "${quality.name || quality.id}"`);
        result += addAttribute('plural_name', `_ "race^${quality.name || quality.id}s"`);
        
        if (quality.description) {
          result += addAttribute('description', `_ "${quality.description}"`);
        }
        
        if (quality.num_traits) {
          result += addAttribute('num_traits', quality.num_traits);
        }
        
        if (quality.undead_variation) {
          result += addAttribute('undead_variation', quality.undead_variation);
        }
        
        // Male names
        if (quality.male_names) {
          result += addAttribute('male_names', `_ "${quality.male_names}"`);
        }

        // Female names
        if (quality.female_names) {
          result += addAttribute('female_names', `_ "${quality.female_names}"`);
        }
        
         
        break;
    }
    result += ` [/${type}]\n`
  })
  result += '\n[/units]\n'

  return result
}

function downloadMod(modData) {
  main = `[textdomain]
    name="wesnoth-${modData.name}"
    path="data/add-ons/${modData.name}/translations"
[/textdomain]

#textdomain wesnoth-${modData.name}
[binary_path]
    path=data/add-ons/${modData.name}
[/binary_path]`
  if (modData.campaign) {
    main += `
[campaign]
    #wesnoth-${modData.name}
    id=${modData.name}
    name= _ "My First Campaign"
    abbrev="MFC"
    define=CAMPAIGN_${modData.name.toUpperCase()}
    #need icon and image (take from core files, don't include external files for sake of simplicity)
    first_scenario=my_first_scenario
    description= _ "This is my first campaign."
    {CAMPAIGN_DIFFICULTY EASY  "units/human-loyalists/spearman.png~RC(magenta>red)" ( _ "Spearman") ( _ "Normal")}
[/campaign]

#ifdef CAMPAIGN_${modData.name.toUpperCase()}
{~add-ons/${modData.name}/scenarios}
#endif`
  }
  let files = [];
  
  // Eras section
  if (modData.eras && modData.eras.length > 0) {
    main += `\n{~add-ons/${modData.name}/era.cfg}`
    const eraContent = eraToWesnothString(modData.eras);
    files.push({ name: 'era.cfg', content: eraContent });
  }
  
  // Units section
  if (modData.units && Object.keys(modData.units).length > 0) {
    main += `\n[units]
  {~add-ons/${modData.name}/units}
[/units]\n`
    const unitFiles = Object.values(modData.units).map(unit => {
      const unitString = unitToWesnothString(unit);
      return { name: `units/${unit.id.replaceAll(' ', '_')}.cfg`, content: unitString };
    });
    files.push(...unitFiles);
  }
  if (selectedMod.qualities) {
    files.push({ name: '_units.cfg', content: qualitiesToWesnothString(selectedMod.qualities)});
    main +=`{~add-ons/${modData.name}/_units.cfg}\n`
  }
  files.push({ name: '_main.cfg', content: main });
  downloadFolderAsZip(modData.name, files, true);
}

function importModData() {
  try {
    const parsed = JSON.parse(document.getElementById('importModDataTextarea').value);
    if (parsed.name in data.mods){
      throw new Error("Mod with the same name already loaded")
    }
    data.mods[parsed.name] = parsed;
    populateModList();
    closeModal();
  } catch (e) {
    alert(`Error importing mod data: ${e}`);
  }
}

//deprecated needs to be updated to fill other types of fields
function parseWesnothUnit(unitString) {
  const unit = {};
  
  // Helper function to extract simple key=value pairs from the whole string or a specific block
    function extractSimpleValue(key, searchString = unitString) {
      const regex = new RegExp(`^\\s*${key}=(.*)$`, 'm');
      const match = searchString.match(regex);
      if (match) {
        let value = match[1].trim();
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        // Remove leading _ for translatable strings
        if (value.startsWith('_')) {
          value = value.replace(/^_\s*/, '').replace(/^["']|["']$/g, '');
        }
        return value;
      }
      return null;
    }
    
    // Helper function to extract numeric values
    function extractNumericValue(key, searchString = unitString) {
      const value = extractSimpleValue(key, searchString);
      return value ? parseInt(value, 10) : null;
    }
    
    // Helper function to extract blocks like [abilities], [resistance], [attack]
    function extractBlock(blockName) {
      const regex = new RegExp(`\\[${blockName}\\](.*?)\\[/${blockName}\\]`, 's');
      const match = unitString.match(regex);
      return match ? match[1] : null;
    }
  
  // Parse simple attributes
  unit.id = extractSimpleValue('id');
  unit.name = extractSimpleValue('name');
  unit.race = extractSimpleValue('race');
  unit.image = extractSimpleValue('image');
  unit.profile = extractSimpleValue('profile');
  unit.hitpoints = extractNumericValue('hitpoints');
  unit.movement_type = extractSimpleValue('movement_type');
  unit.movement = extractNumericValue('movement');
  unit.experience = extractNumericValue('experience');
  unit.level = extractNumericValue('level');
  unit.alignment = extractSimpleValue('alignment');
  unit.advances_to = extractSimpleValue('advances_to');
  unit.cost = extractNumericValue('cost');
  unit.description = extractSimpleValue('description');
  unit.usage = extractSimpleValue('usage');
  unit.die_sound = extractSimpleValue('die_sound');
  
  // Parse abilities - INCLUDE lines starting with {
  const abilitiesBlock = extractBlock('abilities');
  if (abilitiesBlock) {
    unit.abilities = abilitiesBlock
      .split('\n')
      .map(line => line.trim())
      .filter(line => line); // Keep all non-empty lines
  }
  
  // Parse resistance
  const resistanceBlock = extractBlock('resistance');
  if (resistanceBlock) {
    unit.resistance = {};
    const lines = resistanceBlock.split('\n');
    lines.forEach(line => {
      const match = line.match(/^\s*(\w+)=(\d+)/);
      if (match) {
        unit.resistance[match[1]] = parseInt(match[2], 10);
      }
    });
  }
  
  // Parse attacks
  const attackRegex = /\[attack\](.*?)\[\/attack\]/gs;
  const attacks = [];
  let attackMatch;
  while ((attackMatch = attackRegex.exec(unitString)) !== null) {
    const attackBlock = attackMatch[1];
    const attack = {};
    
    // Extract values from THIS specific attack block
    attack.name = extractSimpleValue('name', attackBlock);
    attack.description = extractSimpleValue('description', attackBlock);
    attack.icon = extractSimpleValue('icon', attackBlock);
    attack.type = extractSimpleValue('type', attackBlock);
    attack.range = extractSimpleValue('range', attackBlock);
    attack.damage = extractNumericValue('damage', attackBlock);
    attack.number = extractNumericValue('number', attackBlock);
    
    // Parse abilities/specials within attack
    const specials = attackBlock.match(/\{[A-Z_][A-Za-z0-9_]*(?:\s+[^}]*)?\}/g);
    if (specials) {
      attack.specials = specials;
    }
    
    attacks.push(attack);
  }
  if (attacks.length > 0) {
    unit.attacks = attacks;
  }
  
  // Parse defense animations
  const defenseAnimLines = unitString.match(/\{DEFENSE_ANIM[^}]*\}/g);
  if (defenseAnimLines) {
    unit.defense_anims = defenseAnimLines;
  }
  
  // Parse standing animation
  const standingAnimBlock = extractBlock('standing_anim');
  if (standingAnimBlock) {
    unit.standing_anim = {};
    unit.standing_anim.start_time = extractNumericValue('start_time', standingAnimBlock);
    
    // Parse frames within standing_anim
    const frameRegex = /\[frame\](.*?)\[\/frame\]/gs;
    const frames = [];
    let frameMatch;
    while ((frameMatch = frameRegex.exec(standingAnimBlock)) !== null) {
      const frameBlock = frameMatch[1];
      const frame = {};
      frame.image = extractSimpleValue('image', frameBlock);
      frames.push(frame);
    }
    if (frames.length > 0) {
      unit.standing_anim.frames = frames;
    }
  }
  
  // Parse attack animations
  const attackAnimRegex = /\[attack_anim\](.*?)\[\/attack_anim\]/gs;
  const attackAnims = [];
  let attackAnimMatch;
  while ((attackAnimMatch = attackAnimRegex.exec(unitString)) !== null) {
    const attackAnimBlock = attackAnimMatch[1];
    const anim = {};
    
    // Get filter_attack name
    const filterBlock = extractBlock('filter_attack');
    if (filterBlock) {
      anim.filter_attack = extractSimpleValue('name', attackAnimBlock.match(/\[filter_attack\](.*?)\[\/filter_attack\]/s)[1]);
    }
    
    anim.missile_start_time = extractNumericValue('missile_start_time', attackAnimBlock);
    anim.start_time = extractNumericValue('start_time', attackAnimBlock);
    
    // Parse missile_frame
    const missileFrameBlock = attackAnimBlock.match(/\[missile_frame\](.*?)\[\/missile_frame\]/s);
    if (missileFrameBlock) {
      anim.missile_frame = {};
      anim.missile_frame.duration = extractNumericValue('duration', missileFrameBlock[1]);
      anim.missile_frame.image = extractSimpleValue('image', missileFrameBlock[1]);
      anim.missile_frame.image_diagonal = extractSimpleValue('image_diagonal', missileFrameBlock[1]);
    }
    
    // Parse frames within attack_anim
    const frameRegex = /\[frame\](.*?)\[\/frame\]/gs;
    const frames = [];
    let frameMatch;
    while ((frameMatch = frameRegex.exec(attackAnimBlock)) !== null) {
      const frameBlock = frameMatch[1];
      const frame = {};
      const imageValue = extractSimpleValue('image', frameBlock);
      if (imageValue) {
        frame.image = imageValue;
      } else {
        // Might be a sound or other line
        const lineContent = frameBlock.trim();
        if (lineContent.startsWith('{')) {
          frames.push(lineContent);
        }
      }
      if (Object.keys(frame).length > 0) {
        frames.push(frame);
      }
    }
    if (frames.length > 0) {
      anim.frames = frames;
    }
    
    attackAnims.push(anim);
  }
  if (attackAnims.length > 0) {
    unit.attack_anims = attackAnims;
  }
  
  return unit;
}

function unitToWesnothString(unit) {
  let result = '#textdomain wesnoth-units\n[unit_type]\n';
  
  // Helper to format a simple key=value pair with proper indentation
  function addAttribute(key, value, indent = '    ') {
    if (value === null || value === undefined) return '';
    
    let formattedValue = value;
    if (typeof value === 'string' && value.includes(' ') && !value.startsWith('_')) {
      formattedValue = `"${value}"`;
    }
    return `${indent}${key}=${formattedValue}\n`;
  }
  
  // Add simple attributes
  result += addAttribute('id', unit.id);
  result += addAttribute('name', unit.name);
  result += addAttribute('race', unit.race);
  result += addAttribute('image', unit.image);
  result += addAttribute('profile', unit.profile);
  result += addAttribute('hitpoints', unit.hitpoints);
  result += addAttribute('movement_type', unit.movement_type);
  result += addAttribute('movement', unit.movement);
  result += addAttribute('experience', unit.experience);
  result += addAttribute('level', unit.level);
  result += addAttribute('alignment', unit.alignment);
  result += addAttribute('advances_to', unit.advances_to);
  result += addAttribute('cost', unit.cost);
  result += addAttribute('description', `_ "${unit.description}"`);
  result += addAttribute('usage', unit.usage);
  result += addAttribute('die_sound', unit.die_sound);
  
  // Add abilities block
  if (unit.abilities && unit.abilities.length > 0) {
    result += '    [abilities]\n';
    unit.abilities.forEach(ability => {
      result += `        ${ability}\n`;
    });
    result += '    [/abilities]\n';
  }
  
  // Add resistance block
  if (unit.resistance && Object.keys(unit.resistance).length > 0) {
    result += '    [resistance]\n';
    Object.entries(unit.resistance).forEach(([type, value]) => {
      result += `        ${type}=${value}\n`;
    });
    result += '    [/resistance]\n';
  }
  
  // Add attacks
  if (unit.attacks && unit.attacks.length > 0) {
    unit.attacks.forEach(attack => {
      result += '    [attack]\n';
      result += addAttribute('name', attack.name, '        ');
      result += addAttribute('description', `_ "${attack.name}"`, '        ');
      result += addAttribute('icon', attack.icon, '        ');
      result += addAttribute('type', attack.type, '        ');
      result += addAttribute('range', attack.range, '        ');
      result += addAttribute('damage', attack.damage, '        ');
      result += addAttribute('number', attack.number, '        ');
      if (attack.abilities && attack.abilities.length > 0) {
        result += '        [specials]\n';
        for (const special of attack.abilities){
          result += `        ${special}\n`;
        }
        result += '        [/specials]\n';
      }
      result += '    [/attack]\n';
    });
  }
  if (unit.blockAnimations && unit.unitDefaultAnimation !== 'No') {
    result += unit.blockAnimations + '\n';
  } else {
    // Add defense animations
    if (unit.defense_anims && unit.defense_anims.length > 0) {
      unit.defense_anims.forEach(anim => {
        result += `    ${anim}\n`;
      });
    }
    
    // Add standing animation
    if (unit.standing_anim) {
      result += '    [standing_anim]\n';
      if (unit.standing_anim.start_time !== null && unit.standing_anim.start_time !== undefined) {
        result += `        start_time=${unit.standing_anim.start_time}\n`;
      }
      if (unit.standing_anim.frames && unit.standing_anim.frames.length > 0) {
        unit.standing_anim.frames.forEach(frame => {
          result += '        [frame]\n';
          if (frame.image) {
            result += `            image="${frame.image}"\n`;
          }
          result += '        [/frame]\n';
        });
      }
      result += '    [/standing_anim]\n';
    }
    
    // Add attack animations
    if (unit.attack_anims && unit.attack_anims.length > 0) {
      unit.attack_anims.forEach(anim => {
        result += '    [attack_anim]\n';
        
        // Add filter_attack
        if (anim.filter_attack) {
          result += '        [filter_attack]\n';
          result += `            name=${anim.filter_attack.name}\n`;
          result += '        [/filter_attack]\n';
        }
        
        // Add missile_start_time
        if (anim.missile_start_time !== null && anim.missile_start_time !== undefined) {
          result += `        missile_start_time=${anim.missile_start_time}\n`;
        }
        
        // Add missile_frame
        if (anim.missile_frame) {
          result += '        [missile_frame]\n';
          if (anim.missile_frame.duration !== null && anim.missile_frame.duration !== undefined) {
            result += `            duration=${anim.missile_frame.duration}\n`;
          }
          if (anim.missile_frame.image) {
            result += `            image="${anim.missile_frame.image}"\n`;
          }
          if (anim.missile_frame.image_diagonal) {
            result += `            image_diagonal="${anim.missile_frame.image_diagonal}"\n`;
          }
          result += '        [/missile_frame]\n';
        }
        
        // Add start_time
        if (anim.start_time !== null && anim.start_time !== undefined) {
          result += `        start_time=${anim.start_time}\n`;
        }
        
        // Add frames
        if (anim.frames && anim.frames.length > 0) {
          anim.frames.forEach(frame => {
            // Handle both object frames and string frames (like sound macros)
            if (typeof frame === 'string') {
              result += `        ${frame}\n`;
            } else {
              result += '        [frame]\n';
              if (frame.image) {
                result += `            image="${frame.image}"\n`;
              }
              result += '        [/frame]\n';
            }
          });
        }
        
        result += '    [/attack_anim]\n';
      });
    }
  }
  
  result += '[/unit_type]\n';
  
  return result;
}

const extraAbilities = `[event]
    name=attacker hits
    first_time_only=no

    [filter_attack]
        special_id=knockback
    [/filter_attack]

    [filter_second]
        [not]
            [filter_location]
                terrain=*^V*
            [/filter_location]
        [/not]
    [/filter_second]

    [if]
        [variable]
            name=second_unit.hitpoints
            greater_than=0
        [/variable]
        [then]
            [store_locations]
                [not]
                    [filter]
                    [/filter]
                [/not]

                [filter_adjacent_location]
                    x,y=$x2,$y2
                    adjacent=-$unit.facing
                [/filter_adjacent_location]

                variable=knockback_target_hex
            [/store_locations]

            [if]
                [variable]
                    name=knockback_target_hex.length
                    greater_than=0
                [/variable]

                [then]
                    [teleport]
                        [filter]
                            x,y=$x2,$y2
                        [/filter]

                        x,y=$knockback_target_hex.x,$knockback_target_hex.y
                        ignore_passability=no
                    [/teleport]

                    [if]
                        [have_unit]
                            x,y=$knockback_target_hex.x,$knockback_target_hex.y
                        [/have_unit]

                        [then]
                            [sound]
                                name=fist.ogg
                            [/sound]

                            # the knockbacked unit doesn't seem to receive experience by default,
                            # so we need to add it manually
                            [store_unit]
                                [filter]
                                    x,y=$knockback_target_hex.x,$knockback_target_hex.y
                                [/filter]

                                kill=yes
                                variable=knockbacked
                            [/store_unit]

                            {VARIABLE_OP knockbacked.experience add $unit.level}

                            [unstore_unit]
                                variable=knockbacked
                                text= _ "knockback"
                                {COLOR_HARM}
                                advance=true
                            [/unstore_unit]

                            {CLEAR_VARIABLE knockbacked}
                        [/then]
                    [/if]
                [/then]
            [/if]

            {CLEAR_VARIABLE knockback_target_hex}
        [/then]
    [/if]
[/event]
#define WEAPON_SPECIAL_KNOCKBACK
    [dummy]
        id=knockback
        name= _ "knockback"
        female_name= _ "female^knockback"
        description=_ "When a unit is hit with a knockback attack, it is immediately pushed back one hex away from the attacker. Units cannot be knocked back into an occupied hex, out of villages or onto terrain they normally could not move to. Only works on offense."
        active_on=offense
    [/dummy]
#enddef
[event]
    name=die
    first_time_only=no

    [filter_attack]
        special_id=bloodlost
    [/filter_attack]

    [modify_unit]
        [filter]
            x,y=$x2,$y2
        [/filter]
        moves=0
        attacks_left=1
    [/modify_unit]
[/event]
#define WEAPON_SPECIAL_BLOODLUST
[dummy]
        id=bloodlost
        name= _ "bloodlost"
        female_name= _ "female^bloodlost"
        description=_ "When it kills a unit it gains another attack"
        active_on=offense
    [/dummy]
#enddef
[event]
    name=attacker hits
    # Works only as attacker.
    # If you want to make a weapon special for this event, set:
    # [dummy]active_on=offense, then the engine greys out the weapon special on defense.
    first_time_only=no
    id=charm_as_attacker

    [filter_attack]
        special_id=charm
        # or special_id=charm, if you create a [dummy] weapon special
    [/filter_attack]

    [filter_second]
        # If the leader is charmed, it might end the scenario,
        # as the other side is now considered defeated without a leader.
        # Better exclude leaders.
        canrecruit=no
        # If the unit would die from the damage,
        # we should not interfere with the event.
        formula="self.hitpoints > 0"
    [/filter_second]

    # Charm the unit
    # Changing the side will also immediately stop the combat and grant both units XP
    [modify_unit]
        [filter]
            x,y=$x2,$y2
        [/filter]
        [variables]
            # to remember the original side
            real_side=$second_unit.side
        [/variables]
        [status]
            # optional, just to easier find the unit in the other event
            charmed=yes
        [/status]
        side=$unit.side
        moves=1
        attacks_left=1
    [/modify_unit]

    [floating_text]
        x,y=$x2,$y2
        # po: short text, only displayed for a moment
        text="<span color='#ffc0cb'>" + _ "charm" + "</span>"
    [/floating_text]
[/event]

[event]
    name=side turn end, scenario end
    # Releasing the unit in the same turn has a few reasons:
    # - a charmed unit cannot be charmed again
    # - if the scenario ends, we can still correct the ownership
    # - things like healing by allies work the usual way
    first_time_only=no
    id=charm_release

    [store_unit]
        [filter]
            side=$side_number
            status=charmed
        [/filter]
        variable=charmed_units
    [/store_unit]

    [foreach]
        array=charmed_units
        [do]
            {VARIABLE this_item.side $this_item.variables.real_side}
            {CLEAR_VARIABLE this_item.variables.real_side}
            {CLEAR_VARIABLE this_item.status.charmed}
            [unstore_unit]
                variable=this_item
            [/unstore_unit]
        [/do]
    [/foreach]

    {CLEAR_VARIABLE charmed_units}
[/event]

#define WEAPON_SPECIAL_CHARM
    [dummy]
        id=charm
        name= _ "charm"
        female_name= _ "female^charm"
        description=_ "When a level 1 or 2 unit is hit by a charm attack, it instantly jumps to the attacker's side, and returns to its original side at the end of the turn. A charmed unit has 1 movement point and can attack."
        apply_to=opponent
        active_on=offense
        [filter_opponent]
            level=0,1
            canrecruit=no
        [/filter_opponent]
    [/dummy]
#enddef
[event]
    name=attacker_hits
    first_time_only=no
    [filter_attack]
        special_id=weapon_pickpocket
    [/filter_attack]
    [store_unit]
        [filter]
            x,y=$x1,$y1
        [/filter]
        variable=unit_att_with_pickpocket
        mode=append
    [/store_unit]
    [set_variable]
        name=unit_att_with_pickpocket.variables.pickpocket_has_worked
        value=yes
    [/set_variable]
    [unstore_unit]
        variable=unit_att_with_pickpocket
    [/unstore_unit]
    {CLEAR_VARIABLE unit_att_with_pickpocket}
[/event]
[event]
    name=attacker_hits
    first_time_only=no
    [filter_attack]
        special_id=weapon_pickpocket
    [/filter_attack]
    [store_unit]
        [filter]
            x,y=$x1,$y1
        [/filter]
        variable=pickpocketer
        mode=append
    [/store_unit]   
    [store_unit]
        [filter]
            x,y=$x2,$y2
        [/filter]
        variable=pickpocketed
        mode=append
    [/store_unit]
    [if]
        [variable]
            name=pickpocketer.variables.pickpocket_has_worked
            boolean_equals=yes
        [/variable]
        [then]
            [gold]
                side=$side_number
                amount=1
            [/gold]
            [unstore_unit]
                variable=pickpocketed
                text="!"
                {COLOR_HEAL}
            [/unstore_unit]
        [/then]
    [/if]
    {CLEAR_VARIABLE pickpocketer,pickpocketed}
[/event]
#define WEAPON_SPECIAL_PICKPOCKET
[dummy]
    id=weapon_pickpocket
    name= _ "pickpocket"
    description= _ "Gain money for attacking your foe. Each strike scores you one gold."
    apply_to=opponent
    active_on=offense
[/dummy]
#enddef
[event]
    name=die
    first_time_only=no
    id=soultaker

    [filter]
        [not]
            status=undrainable
        [/not]
    [/filter]

    # To use Soultaker as weapon special, use this check INSTEAD of the above one.
    [filter_second_attack]
        special_id=soultaker
    [/filter_second_attack]

    [floating_text]
        x,y=$x2,$y2
        text="<span color='#00ff00'>" + _ "+1 damage" + "</span>"
    [/floating_text]

    [object]
        silent=yes
        duration=forever
        [filter]
            x,y=$x2,$y2
        [/filter]

        [effect]
            apply_to=attack
            increase_damage=1
            range=melee
            # This will increase all melee attacks by 1. To only increase the attack used in this fight, use
            name=$second_weapon.name
        [/effect]
    [/object]
[/event]
#define WEAPON_SPECIAL_SOULTAKER
[dummy]
    id=soultaker
    name= _ "soultaker"
    description=_ "This unit gains an additional point added to its melee damage whenever it kills a living unit."
    [filter_opponent]
        [not]
            status=undrainable
        [/not]
    [/filter_opponent]
[/dummy]
#enddef
[event]
    name=attack
    first_time_only=no
    [filter_attack]
        special_id=mind_flay
    [/filter_attack]
    {VARIABLE hit_number 0}
[/event]
[event]
    name=attacker_hits
    first_time_only=no
    [filter_attack]
        special_id=mind_flay
    [/filter_attack]
    {VARIABLE_OP hit_number add 1}
[/event]
[event]
    name=attack_end
    first_time_only=no
    [filter_attack]
        special_id=mind_flay
    [/filter_attack]
    {VARIABLE_OP second_unit.experience sub $hit_number}
    {VARIABLE_OP unit.experience add $hit_number}
    [unstore_unit]
        variable=unit
        text=$hit_number
        blue=255
    [/unstore_unit]
    [unstore_unit]
        variable=second_unit
    [/unstore_unit]
    {CLEAR_VARIABLE hit_number}
[/event]
#define WEAPON_SPECIAL_MIND_FLAY
    [mindflay]
        id=mind_flay
        name= _ "Mind Flay"
        description= _ "When used offensively, each hit of the mind flay attack takes 1 point of experience from the defender and gives it to the attacker."
        active_on=offense
    [/mindflay]
#enddef

#define WEAPON_SPECIAL_WHIRLWIND
[dummy]      #This can be changed to a dummy tag if you don't want it to do anything.
    id=whirlwind
    name= _ "whirlwind"
    description= _ "When this attack is used, all units adjacent the attacker take the damage, and cannot be countered."
    value=0
    apply_to=opponent
    active_on=offense
[/dummy]
#enddef
[event]
    name=attacker_hits
    first_time_only=no
    [filter_attack]
        special_id=whirlwind
    [/filter_attack]
    {VARIABLE has_drain no}      # Notifies the weapon specials
    {VARIABLE has_slow no}
    {VARIABLE has_poison no}
    [if]
        [variable]
            name=weapon.specials.drains.id
            equals=drains
        [/variable]
        [then]
            {VARIABLE has_drain yes}
        [/then]
    [/if]
    [if]
        [variable]
            name=weapon.specials.poison.id
            equals=poison
        [/variable]
        [then]
            {VARIABLE has_poison yes}
        [/then]
    [/if]
    [if]
        [variable]
            name=weapon.specials.slow.id
            equals=slow
        [/variable]
        [then]
            {VARIABLE has_slow yes}
        [/then]
    [/if]
    [if]
        [variable]
            name=has_drain
            boolean_equals=yes
        [/variable]
        [then]
            [store_unit]        #We need to know how many units were drained, and what were their resistances
                [filter]
                    [filter_adjacent]
                        x,y=$x1,$y1
                    [/filter_adjacent]
                    [not]
                        side=$unit.side
                    [/not]
                    [not]         #The target unit is already hit by the attack
                        x,y=$x2,$y2
                    [/not]
                    [not]
                        status=undrainable,petrified
                    [/not]
                [/filter]
                variable=units
            [/store_unit]
            {VARIABLE healed_amount 0}
            [foreach]
                array=units
                [do]
                    [switch]            #Check the resistances
                        variable=weapon.type
                        [case]
                            value=arcane
                            {VARIABLE_OP healed_amount add "$($this_item.resistance.arcane*$weapon.damage)"}
                        [/case]
                        [case]
                            value=fire
                            {VARIABLE_OP healed_amount add "$($this_item.resistance.fire*$weapon.damage)"}
                        [/case]
                        [case]
                            value=cold
                            {VARIABLE_OP healed_amount add "$($this_item.resistance.cold*$weapon.damage)"}
                        [/case]
                        [case]
                            value=blade
                            {VARIABLE_OP healed_amount add "$($this_item.resistance.blade*$weapon.damage)"}
                        [/case]
                        [case]
                            value=pierce
                            {VARIABLE_OP healed_amount add "$($this_item.resistance.pierce*$weapon.damage)"}
                        [/case]
                        [case]
                            value=impact
                            {VARIABLE_OP healed_amount add "$($this_item.resistance.impact*$weapon.damage)"}
                        [/case]
                    [/switch]
                [/do]
            [/foreach]
            #Float the healed amount over the unit, like if it had drained
            [floating_text]        #Two numbers will float, the one from the regular hit and one from this
                x,y=$x1,$y1        #Operating with huge numbers because rounding is a problem
                text="<span color='#00ff00'>" + "$($healed_amount/200)" + "</span>"
            [/floating_text]
            [heal_unit]
                [filter]
                    x,y=$x1,$y1
                [/filter]
                amount=$($healed_amount/200)
                restore_statuses=no
                animate=no
            [/heal_unit]
            {CLEAR_VARIABLE units,healed_amount}
        [/then]
    [/if]
    [harm_unit]
        [filter]
            [filter_adjacent]
                x,y=$x1,$y1
            [/filter_adjacent]
            [not]
                side=$unit.side
            [/not]
            [not]
                x,y=$x2,$y2
            [/not]
            [not]
                status=petrified
            [/not]
        [/filter]
        [filter_second]
            x,y=$x1,$y1
        [/filter_second]
        amount=$weapon.damage
        damage_type=$weapon.type
        fire_event=yes
        experience=yes      #You will have to think about this
        poisoned=$has_poison   #We have detected these two effects before
        slowed=$has_slow
    [/harm_unit] 
    {CLEAR_VARIABLE has_slow,has_poison,has_drain}
[/event]
`