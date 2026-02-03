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

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
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
    if (era.additionalCode) {
      result += era.additionalCode
    }
    result += '\n[/era]\n';
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
              if (frame.sound) {
                result += `            sound="${frame.sound}"\n`;
              }
              result += '        [/frame]\n';
            }
          });
        }
        
        result += '    [/attack_anim]\n';
      });
    }
  }
    
  if (unit.codeBlock) {
    result += unit.codeBlock +'\n'
  }

  result += '[/unit_type]\n';
  
  return result;
}

function balanceCalculatior(unit, resistances = 0) {
  
  if (!unit.movement || !unit.hitpoints || !unit.cost || ! unit.experience || typeof unit.level !== "number") {
    return "Needs more info"
  }
  
  let powerScale = Number(unit.hitpoints)
  powerScale += unit.movement * 5
  powerScale -= unit.experience/3
  powerScale += unit.advances_to ? unit.advances_to.split(',').length : 0
  powerScale += unit.abilities ? unit.abilities.split('\n').length * 5 : 0
  const aTypes = []

  unit.attacks?.forEach((attack)=> {
    powerScale += (attack.damage * attack.number) / unit.attacks.length
    powerScale += attack.abilities ? attack.abilities.length * 5 : 0
    if (attack.abilities.includes('{WEAPON_SPECIAL_SWARM}')) {
      powerScale -= 5
    }
    powerScale += unit.attacks.length * 2
    aTypes.push(attack.range)
  })

  if (aTypes.includes("ranged") && aTypes.includes("melee")){
    powerScale += 5
  }
  if (unit.level < 3) {
    powerScale += ((unit.level+1)*8)-unit.cost
  }
  return ((powerScale + resistances/5)- Math.max(unit.level,1)*12)/68
}

const input = document.getElementById("folderInput");
let loadedImgs = {}

input.addEventListener("change", () => {
  const loadedImgsList = Object.values(loadedImgs)
  loadedImgsList.forEach(URL.revokeObjectURL);
  loadedImgs = {}

  const files = Array.from(input.files);

  files
    .filter(file => file.type.startsWith("image/"))
    .forEach(file => {
      loadedImgs[file.webkitRelativePath] = URL.createObjectURL(file)

    });
  populateUnitList()
});