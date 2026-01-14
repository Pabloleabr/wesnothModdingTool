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

function downloadFolderAsZip(folderName, files) {
  const zip = new JSZip();
  files.forEach(file => {
    zip.file(`${folderName}/${file.name}`, file.content);
  });

  zip.generateAsync({ type: 'blob' }).then(function(content) {
    downloadBlob(`${folderName}.zip`, content);
  }).catch(err => {
    console.error('Error creating ZIP:', err);
  });
}


function eraToWesnothString(eras) {
  let result = '#textdomain wesnoth-my_first_campaign\n';
  
  // Helper to format a simple key=value pair with proper indentation
  function addAttribute(key, value, indent = '    ') {
    if (value === null || value === undefined || value === '') return '';
    
    let formattedValue = value;
    if (typeof value === 'string' && value.includes(' ') && !value.startsWith('_')) {
      formattedValue = `"${value}"`;
    }
    return `${indent}${key}=${formattedValue}\n`;
  }
  
  // Process each era
  eras.forEach(era => {
    result += '[era]\n';
    result += addAttribute('id', era.id);
    result += addAttribute('name', `_ "${era.name}"`);
    result += '{RANDOM_SIDE}\n';
    if (era.defaultFactions) {
      result += `{multiplayer/factions/drakes-aoh.cfg}
{multiplayer/factions/drakes-default.cfg}
{multiplayer/factions/dunefolk-aoh.cfg}
{multiplayer/factions/dunefolk-default.cfg}
{multiplayer/factions/knalgans-aoh.cfg}
{multiplayer/factions/knalgans-default.cfg}
{multiplayer/factions/loyalists-aoh.cfg}
{multiplayer/factions/loyalists-default.cfg}
{multiplayer/factions/northerners-aoh.cfg}
{multiplayer/factions/northerners-default.cfg}
{multiplayer/factions/rebels-aoh.cfg}
{multiplayer/factions/rebels-default.cfg}
{multiplayer/factions/undead-aoh.cfg}
{multiplayer/factions/undead-default.cfg}`
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
    
    result += '[/era]\n';
  });
  
  return result;
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
[/units]`
    const unitFiles = Object.values(modData.units).map(unit => {
      const unitString = unitToWesnothString(unit);
      return { name: `units/${unit.id}.cfg`, content: unitString };
    });
    files.push(...unitFiles);
  }
  files.push({ name: '_main.cfg', content: main });
  downloadFolderAsZip(modData.name, files);
}

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
    if (typeof value === 'string' && value.includes(' ')) {
      formattedValue = `"${value}"`;
    }
    return `${indent}${key}=${formattedValue}\n`;
  }
  
  // Add simple attributes
  result += addAttribute('id', unit.id);
  result += addAttribute('name', unit.name);
  result += addAttribute('race', unit.race);
  result += addAttribute('unitDefaultAnimation', unit.unitDefaultAnimation);
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
  result += addAttribute('description', unit.description);
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
      result += addAttribute('description', attack.description, '        ');
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

/*unit default format
#textdomain wesnoth-units
[unit_type]
    id=my_first_unit
    name= _ "Bone Shooter Copy Test"
    race=undead
    image="units/undead-skeletal/bone-shooter.png"
    profile=portraits/undead/bone-shooter.webp
    hitpoints=43
    movement_type=undeadfoot
    movement=6
    experience=61
    level=2
    alignment=chaotic
    advances_to=Banebow
    cost=25
    description= _ "Of a dark sorcerer’s creations, some take more strongly to the false life given them. The potency of their unlife is given equipment to match; archers, in particular, are often outfitted with a truly vile arsenal. Their quivers are filled with shafts made not of wood, but of the bones of their victims. It follows that they are dubbed simply ‘Bone-Shooters’ by their unfortunate enemies."
    usage=archer
    die_sound=skeleton-big-die.ogg
    [abilities]
        {ABILITY_SUBMERGE}
    [/abilities]
    [resistance]
        blade=60
        pierce=40
        impact=120
    [/resistance]
    [attack]
        name=dagger
        description=_"dagger"
        icon=attacks/dagger-undead.png
        type=blade
        range=melee
        damage=6
        number=2
    [/attack]
    [attack]
        name=bow
        description=_"bow"
        icon=attacks/bow-orcish.png
        type=pierce
        range=ranged
        damage=10
        number=3
    [/attack]
    {DEFENSE_ANIM_RANGE "units/undead-skeletal/bone-shooter-melee-defend-2.png" "units/undead-skeletal/bone-shooter-melee-defend-1.png" {SOUND_LIST:SKELETON_BIG_HIT} melee}
    {DEFENSE_ANIM_RANGE "units/undead-skeletal/bone-shooter-bow-defend.png" "units/undead-skeletal/bone-shooter-bow.png" {SOUND_LIST:SKELETON_BIG_HIT} ranged}
    [standing_anim]
        start_time=0
        [frame]
            image="units/undead-skeletal/bone-shooter-bob-[1~8].png:[150*3,200,150*4]"
        [/frame]
    [/standing_anim]
    [attack_anim]
        [filter_attack]
            name=bow
        [/filter_attack]
        missile_start_time=-150
        [missile_frame]
            duration=150
            image="projectiles/bone-n.png"
            image_diagonal="projectiles/bone-ne.png"
        [/missile_frame]
        start_time=-445
        [frame]
            image="units/undead-skeletal/bone-shooter-bow.png:65"
        [/frame]
        [frame]
            image="units/undead-skeletal/bone-shooter-bow-attack-[1~4].png:[75*2,100,130]"
        [/frame]
        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}
        [frame]
            image="units/undead-skeletal/bone-shooter-bow.png:65"
        [/frame]
    [/attack_anim]
    [attack_anim]
        [filter_attack]
            name=dagger
        [/filter_attack]
        start_time=-275
        [frame]
            image="units/undead-skeletal/bone-shooter-melee-defend-1.png:50"
        [/frame]
        [frame]
            image="units/undead-skeletal/bone-shooter-melee-attack-[1~4].png:100"
        [/frame]
        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -125}
        [frame]
            image="units/undead-skeletal/bone-shooter-melee-defend-1.png:50"
        [/frame]
    [/attack_anim]
[/unit_type]
  */

/* json format unit
{
  id: "my_first_unit",
  name: "Bone Shooter Copy Test",
  race: "undead",
  image: "units/undead-skeletal/bone-shooter.png",
  profile: "portraits/undead/bone-shooter.webp",
  hitpoints: 43,
  movement_type: "undeadfoot",
  movement: 6,
  experience: 61,
  level: 2,
  alignment: "chaotic",
  advances_to: "Banebow",
  cost: 25,
  description: "Of a dark sorcerer's creations, some take more strongly to the false life given them. The potency of their unlife is given equipment to match; archers, in particular, are often outfitted with a truly vile arsenal. Their quivers are filled with shafts made not of wood, but of the bones of their victims. It follows that they are dubbed simply 'Bone-Shooters' by their unfortunate enemies.",
  usage: "archer",
  die_sound: "skeleton-big-die.ogg",
  abilities: [
    "{ABILITY_SUBMERGE}"
  ],
  resistance: {
    blade: 60,
    pierce: 40,
    impact: 120
  },
  attacks: [
    {
      name: "dagger",
      description: "dagger",
      icon: "attacks/dagger-undead.png",
      type: "blade",
      range: "melee",
      damage: 6,
      number: 2
    },
    {
      name: "bow",
      description: "bow",
      icon: "attacks/bow-orcish.png",
      type: "pierce",
      range: "ranged",
      damage: 10,
      number: 3
    }
  ],
  defense_anims: [
  "{DEFENSE_ANIM_RANGE 'units/undead-skeletal/bone-shooter-melee-defend-2.png' 'units/undead-skeletal/bone-shooter-melee-defend-1.png' {SOUND_LIST:SKELETON_BIG_HIT} melee}",
  "{DEFENSE_ANIM_RANGE 'units/undead-skeletal/bone-shooter-bow-defend.png' 'units/undead-skeletal/bone-shooter-bow.png' {SOUND_LIST:SKELETON_BIG_HIT} ranged}",
  ],
  standing_anim: {
    start_time: 0,
    frames: [
      {
        image: "units/undead-skeletal/bone-shooter-bob-[1~8].png:[150*3,200,150*4]"
      }
    ]
  },
  attack_anims: [
    {
      filter_attack: "bow",
      missile_start_time: -150,
      missile_frame: {
        duration: 150,
        image: "projectiles/bone-n.png",
        image_diagonal: "projectiles/bone-ne.png"
      },
      start_time: -445,
      frames: [
        {
          image: "units/undead-skeletal/bone-shooter-bow.png:65"
        },
        {
          image: "units/undead-skeletal/bone-shooter-bow-attack-[1~4].png:[75*2,100,130]"
        },
        "{SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}",
        {
          image: "units/undead-skeletal/bone-shooter-bow.png:65"
        }
      ],
      sound: "bow.ogg",
      sound_miss: "bow-miss.ogg"
    },
    {
      filter_attack: "dagger",
      start_time: -275,
      frames: [
        {
          image: "units/undead-skeletal/bone-shooter-melee-defend-1.png:50"
        },
        {
          image: "units/undead-skeletal/bone-shooter-melee-attack-[1~4].png:100"
        },
        "{SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -125}",
        {
          image: "units/undead-skeletal/bone-shooter-melee-defend-1.png:50"
        }
      ],
      sound: "dagger-swish.wav"
    }
  ]
}; */