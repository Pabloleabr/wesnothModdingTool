let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : { mods: {} };

let selectedMod = localStorage.getItem('selectedMod') ? data.mods[localStorage.getItem('selectedMod')] : null;
let selectedUnit = {};
if (selectedMod) {
  selectedUnit = localStorage.getItem('selectedUnit') ? selectedMod.units[localStorage.getItem('selectedUnit')] : {};
}
let currentPage = 'mainPage';
let blockText = '';


function createMod() {
  const modName = prompt("Enter the name of the new mod:");
  if (modName && !data.mods[modName]) {
    data.mods[modName] = { name: modName, description: `Description for ${modName}`, units: {} };
    populateModList();
    localStorage.setItem('data', JSON.stringify(data));
  }
}

function populateListBase(listId, items, onClick, deleteFunc) {
  const list = document.getElementById(listId);
  if (!list) {
    // No list present on this page — nothing to populate.
    return;
  }
  list.innerHTML = '';
  items.forEach((mod, index) => {
    const li = document.createElement('li');
    const copy = document.createElement('button');
    if (mod.image) {
      const img = document.createElement('img');
      const newSrc = 'images/' + mod.image
      if (loadedImgs.hasOwnProperty(newSrc)){
        img.src = loadedImgs[newSrc]
      } else {
        img.src = 'imgs/' + mod.image;
      }
      img.style.width = '72px';
      img.style.margin = '-8px';
      img.classList.add('generatedImg')
      li.appendChild(img);
      copy.innerText = '📝'
      copy.title = "copy"
      copy.classList.add('trash-button')
      copy.onclick = () => {
        const unitCopy = structuredClone(mod) 
        unitCopy.id = mod.id + "(copy)"
        unitCopy.name = mod.name + "(copy)"
        selectedMod.units[unitCopy.id] = unitCopy
        localStorage.setItem('data', JSON.stringify(data))
        showPage('unitsPage')
      }
    }
    const button = document.createElement('button');
    const trash = document.createElement('button');
    trash.innerText = '🗑️';
    trash.classList.add('trash-button');
    trash.onclick = () => deleteFunc(mod);
    button.innerText = mod.name;
    // change the target page id to one that actually exists in your HTML,
    // or create a page with id "modDetailsPage" in your HTML.
    button.onclick = () => onClick(mod);
    li.appendChild(button);
    if (copy.innerText) li.appendChild(copy);
    li.appendChild(trash);
    list.appendChild(li);
  });
}
function populateModList() {
  const modList = Object.values(data.mods);
  if (modList.length > 0){
    document.getElementById('modsList').style.display = 'flex'
  }
  populateListBase('modsList', modList, (mod) => {
    selectedMod = mod;
    localStorage.setItem('selectedMod', mod.name);
    showPage('modDetailsPage');
  },
  (mod) => {
    if (confirm(`Are you sure you want to delete mod "${mod.name}"? This action cannot be undone.`)) {
      delete data.mods[mod.name];
      localStorage.setItem('data', JSON.stringify(data));
      populateModList();
    }
  });
}

function populateUnitList() {
  const unitsList = Object.values(selectedMod.units);
  populateListBase('unitsList', unitsList, (unit) => {
    selectedUnit = unit;
    localStorage.setItem('selectedUnit', unit.id);
    showPage('UnitPage');
  },
  (unit) => {
    if (confirm(`Are you sure you want to delete unit "${unit.name}"? This action cannot be undone.`)) {
      delete selectedMod.units[unit.id];  
      populateUnitList();
    }
  });
}

function populateUnitForm() {
  const unitForm = document.getElementById('UnitForm');
  const movetypeSelect = document.getElementById('unitMovementType')
  movetypeSelect.innerHTML = ''
  const mts = [...(getYourMT().children || []), ...movementTypesData[0].children]
  mts.forEach((e)=> {
   const option = document.createElement('option')
   option.value = e
   option.textContent = e
   movetypeSelect.appendChild(option)
  })
  if (!unitForm || !selectedUnit) return;

  // Fill basic fields
  document.getElementById('unitName').value = selectedUnit.name || '';
  document.getElementById('unitRace').value =  (selectedUnit.race || '').toLowerCase();
  document.getElementById('unitDefaultAnimation').value = selectedUnit.unitDefaultAnimation || 'No';
  document.getElementById('unitImage').value = selectedUnit.image || '';
  document.getElementById('unitProfile').value = selectedUnit.profile || '';
  document.getElementById('unitHitpoints').value = selectedUnit.hitpoints || '';
  document.getElementById('unitMovement').value = selectedUnit.movement || '0';
  document.getElementById('unitMovementType').value = selectedUnit.movement_type || '';
  document.getElementById('unitCost').value = selectedUnit.cost || '0';
  document.getElementById('unitLevel').value = selectedUnit.level || '0';
  document.getElementById('unitExperience').value = selectedUnit.experience || '';
  document.getElementById('unitAlignment').value = selectedUnit.alignment || '';
  document.getElementById('unitAdvancesTo').value = selectedUnit.advances_to || 'null';
  document.getElementById('unitDescription').value = selectedUnit.description || '';
  document.getElementById('unitUsage').value = selectedUnit.usage || '';
  document.getElementById('unitDieSound').value = selectedUnit.die_sound || '';

  // Clear and populate attacks
  document.getElementById('attacksContainer').innerHTML = '';
  if (selectedUnit.attacks && selectedUnit.attacks.length > 0) {
    selectedUnit.attacks.forEach((attack, index) => {
      addAttack();
      const attackDiv = document.querySelectorAll('#attacksContainer > div')[index];
      attackDiv.querySelector('.attack-name').value = attack.name || '';
      attackDiv.querySelector('.attack-icon').value = attack.icon || '';
      attackDiv.querySelector('.attack-type').value = attack.type || '';
      attackDiv.querySelector('.attack-range').value = attack.range || '';
      attackDiv.querySelector('.attack-damage').value = attack.damage || '';
      attackDiv.querySelector('.attack-number').value = attack.number || '';
      attackDiv.querySelector('.attack-number').value = attack.number || '';
      // Populate abilities
      const attackAbilities = attack.abilities || [];
      if (attackAbilities.length > 0) {
        attackDiv.querySelector('.attack-abilities').value = attackAbilities.join('\n');
      } else {
        attackDiv.querySelector('.attack-abilities').value = '';
      }
    });
  }

  // Clear and populate resistances
  document.getElementById('resistanceContainer').innerHTML = '';
  if (selectedUnit.resistance && Object.keys(selectedUnit.resistance).length > 0) {
    Object.entries(selectedUnit.resistance).forEach(([type, value]) => {
      addResistance();
      const resistDiv = document.querySelectorAll('#resistanceContainer > div');
      const lastResist = resistDiv[resistDiv.length - 1];
      lastResist.querySelector('.resistance-type').value = type;
      lastResist.querySelector('.resistance-value').value = value;
    });
  }

  // Populate abilities
  if (selectedUnit.abilities && selectedUnit.abilities.length > 0) {
    document.getElementById('unitAbilities').value = selectedUnit.abilities.join('\n');
  } else {
    document.getElementById('unitAbilities').value = '';
  }
  document.getElementById('codeBlock').value = selectedUnit.codeBlock || ''

  // Populate standing animation
  document.getElementById('standingAnimContainer').innerHTML = '';
  document.getElementById('standingStartTime').value = (selectedUnit.standing_anim && selectedUnit.standing_anim.start_time) || '';
  if (selectedUnit.standing_anim && Array.isArray(selectedUnit.standing_anim.frames)) {
    selectedUnit.standing_anim.frames.forEach((frame) => {
      addStandingFrame();
      const frames = document.querySelectorAll('#standingAnimContainer > div');
      const last = frames[frames.length - 1];
      last.querySelector('.standing-frame-image').value = frame.image || '';
    });
  }

  // Populate attack animations
  document.getElementById('attackAnimsContainer').innerHTML = '';
  if (selectedUnit.attack_anims && Array.isArray(selectedUnit.attack_anims)) {
    selectedUnit.attack_anims.forEach((anim) => {
      addAttackAnim();
      const animDivs = document.querySelectorAll('#attackAnimsContainer > div');
      const lastAnim = animDivs[animDivs.length - 1];
      lastAnim.querySelector('.anim-filter-name').value = (anim.filter_attack && anim.filter_attack.name) || '';
      lastAnim.querySelector('.anim-missile-start-time').value = anim.missile_start_time || '';
      lastAnim.querySelector('.anim-start-time').value = anim.start_time || '';

      // missile frame
      if (anim.missile_frame) {
        addMissileFrame(lastAnim.id);
        const mf = lastAnim.querySelector('.missileFrameContainer > div');
        if (mf) {
          mf.querySelector('.missile-duration').value = anim.missile_frame.duration || '';
          mf.querySelector('.missile-image').value = anim.missile_frame.image || '';
          mf.querySelector('.missile-image-diagonal').value = anim.missile_frame.image_diagonal || '';
        }
      }

      // frames
      if (anim.frames && Array.isArray(anim.frames)) {
        anim.frames.forEach((frame) => {
          addAttackAnimFrame(lastAnim.id);
          const frames = lastAnim.querySelectorAll('.anim-frame');
          const lastFrame = frames[frames.length - 1];
          lastFrame.querySelector('.anim-frame-image').value = frame.image || '';
          lastFrame.querySelector('.anim-frame-sound').value = frame.sound || '';
        });
      }
    });
  }
}

// Update unit info panel
function updateUnitInfoPanel() {
  const hitpoints = document.getElementById('unitHitpoints').value || '-';
  let alingment = document.getElementById('unitAlignment').value || '-';
  const movement = document.getElementById('unitMovement').value || '-';
  const level = document.getElementById('unitLevel').value || '-';
  const cost = document.getElementById('unitCost').value || '-';
  const experience = document.getElementById('unitExperience').value || '-';
  const imagePath = document.getElementById('unitImage').value || '';
  const movetype = document.getElementById('unitMovementType').value
  switch (alingment) {
    case 'chaotic':
      alingment = '🌒'
      break;
      case 'lawful':
        alingment = '☀️'
      break;
      case 'neutral':
        alingment = '⚖️'
        break;
        case 'liminal':
          alingment = '🌅'
          break;
        }
        // Update stat values
  const yourMT = Object.values(selectedMod.qualities).filter((q)=> q.type === "mt" && q.name === movetype && q.resistances).map((q)=>q.resistances.split("\n"))
  if (resistanceDict.hasOwnProperty(movetype)){
    document.getElementById('panelBlade').textContent = String((resistanceDict[movetype].blade -100)*-1) + '%';
    document.getElementById('panelPierce').textContent = String((resistanceDict[movetype].pierce -100)*-1) + '%';
    document.getElementById('panelImpact').textContent = String((resistanceDict[movetype].impact -100)*-1) + '%';
    document.getElementById('panelFire').textContent = String((resistanceDict[movetype].fire -100)*-1) + '%';
    document.getElementById('panelCold').textContent = String((resistanceDict[movetype].cold -100)*-1) + '%';
    document.getElementById('panelArcane').textContent = String((resistanceDict[movetype].arcane -100)*-1) + '%';
  } else {
    document.getElementById('panelBlade').textContent = '-'
    document.getElementById('panelPierce').textContent = '-'
    document.getElementById('panelImpact').textContent = '-'
    document.getElementById('panelFire').textContent = '-'
    document.getElementById('panelCold').textContent = '-'
    document.getElementById('panelArcane').textContent = '-'
    if (yourMT.length > 0) {
      yourMT[0].forEach((r)=>{
        const tv = r.split('=')
        if (tv.length > 1 && attackTypesData[0].children.includes(tv[0])){
          document.getElementById('panel'+capitalizeFirstLetter(tv[0])).textContent = String((Number(tv[1]) -100)*-1) + '%'
        }
      })
    }
  } 
  document.querySelectorAll('.resistance-type').forEach((e) => {
    const type = e.value
    if (attackTypesData[0].children.includes(type)){
      document.getElementById('panel'+capitalizeFirstLetter(type)).textContent = e.nextElementSibling.nextElementSibling.value + '%'
    }
  })
  document.getElementById('panelHitpoints').textContent = hitpoints;
  document.getElementById('panelAlingment').textContent = alingment;
  document.getElementById('panelMovement').textContent = movement;
  document.getElementById('panelLevel').textContent = level;
  document.getElementById('panelCost').textContent = cost;
  document.getElementById('panelExperience').textContent = experience;
  // Update image
  const unitImageElement = document.getElementById('unitDisplayImage');
  if (imagePath) {
    // Try to load from custom images first, then fallback to default imgs folder
    const customPath = 'images/' + imagePath;
    const defaultPath = 'imgs/' + imagePath;
    unitImageElement.alt = imagePath
    if (loadedImgs && loadedImgs.hasOwnProperty(customPath)) {
      unitImageElement.src = loadedImgs[customPath];
    } else {
      unitImageElement.src = defaultPath;
    }
    unitImageElement.style.display = 'block';
  } else {
    unitImageElement.src = '';
    unitImageElement.style.display = 'none';
  }
}

function attachUnitPanelListeners() {
  const fieldsToMonitor = [
    'unitHitpoints',
    'unitMovement',
    'unitLevel',
    'unitCost',
    'unitExperience',
    'unitImage',
    'unitAlignment',
    'unitMovementType'
  ];

  fieldsToMonitor.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('input', updateUnitInfoPanel);
      field.addEventListener('change', updateUnitInfoPanel);
    }
  });
}

function populateEraList() {
  const eraContainer = document.getElementById('eraFramesContainer');
  if (!eraContainer || !selectedMod) return;
  
  // Clear existing era frames
  eraContainer.innerHTML = '';
  
  // Populate eras if they exist
  if (selectedMod.eras && selectedMod.eras.length > 0) {
    selectedMod.eras.forEach(era => {
      addEraFrame();
      const eraDivs = eraContainer.querySelectorAll(':scope > div');
      const eraDiv = eraDivs[eraDivs.length - 1];
      
      // Fill era fields
      let name = eraDiv.querySelector('[name="eraName"]');
      name.value = era.name || '';
      var event = new Event('change');
      name.dispatchEvent(event);
      eraDiv.querySelector('[name="defaultFactions"]').checked = era.defaultFactions || false;
      eraDiv.querySelector('[name="defaultAoHFactions"]').checked = era.defaultAoHFactions || false;
      eraDiv.querySelector('[name="extraAbilities"]').checked = era.extraAbilities || false;
      
      // Populate factions
      if (era.factions && era.factions.length > 0) {
        era.factions.forEach(faction => {
          addFaction(eraDiv.id);
          const factionDivs = eraDiv.querySelectorAll('.factionContainer > .faction-frame');
          const factionDiv = factionDivs[factionDivs.length - 1];
          
          // Fill faction fields
          factionDiv.querySelector('[name="factionName"]').value = faction.name || '';
          factionDiv.querySelector('[name="factionImage"]').value = faction.image || '';
          factionDiv.querySelector('[name="factionType"]').value = faction.type || '';
          factionDiv.querySelector('[name="factionLeaders"]').value = faction.leaders || '';
          factionDiv.querySelector('[name="factionRecruits"]').value = faction.recruits || '';
          factionDiv.querySelector('[name="factionAI"]').value = faction.ai || '';
        });
      }
    });
  }
}

function showPage(pageid) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.hidden = true;
  });

  const target = document.getElementById(pageid);
  if (!target) {
    console.warn(`showPage: no element with id "${pageid}" found`);
    pageid = 'mainPage'
  }
  
  // Hide the unit info panel by default, show only on UnitPage
  const unitInfoPanel = document.getElementById('unitInfoPanel');
  if (unitInfoPanel) {
    unitInfoPanel.setAttribute('data-visible', pageid === 'UnitPage' ? 'true' : 'false');
  }
  
  try {
    switch (pageid) {
    case 'mainPage':
      populateModList();
      selectedMod = null;
      localStorage.setItem('selectedMod', null);
      break;
    case 'unitsPage':
      populateUnitList();
      selectedUnit = null;
      localStorage.setItem('selectedUnit', null);
      break;
    case 'UnitPage':
      populateUnitForm();
      updateUnitInfoPanel();
      attachUnitPanelListeners();
      break;
    case 'erasPage':
      populateEraList();
      break;
    case 'qualitiesPage':
      populateQualities();
      break;
    case 'modDetailsPage':
      document.getElementById('modName').innerText = localStorage.getItem('selectedMod') || 'No Mod Selected';
  }
  } catch (error) {
    showPage('mainPage')
    console.error(error);
    
  }
  
  if (target){
    target.hidden = false;
  }
  localStorage.setItem('lastPage', pageid);
}

// Attack counter for unique IDs
let attackCounter = 0;
let resistanceCounter = 0;

function addAttack() {
  const container = document.getElementById('attacksContainer');
  const attackId = `attack_${attackCounter++}`;
  
  const div = document.createElement('div');
  div.id = attackId;
  div.classList.add('attack-container')
  div.style.border = '1px solid #d1ad0a';
  div.style.padding = '10px';
  div.style.margin = '10px 0';
  div.innerHTML = `
    <h4>Attack ${attackCounter}</h4>
    <label>Name:</label>
    <input type="text" class="attack-name" placeholder="Sword">
    <br>
    <label>Icon:<button type="button" class="info-icon" onclick="openModal('Attack Icon Information', attacksData, 'attackIconInput_${attackId}')" title="View Attack Icon information">ℹ️</button></label>
    <input type="text" id="attackIconInput_${attackId}" class="attack-icon" placeholder="attacks/sword.png">
    <br>
    <label>Type:<button type="button" class="info-icon" onclick="openModal('Attack Types Information', attackTypesData)" title="View Attack types information">ℹ️</button></label>
    <input type="text" class="attack-type" placeholder="blade">
    <br>
    <label>Range:</label>
    <select type="text" class="attack-range" placeholder="melee">
      <option value="melee">Melee</option>
      <option value="ranged">Ranged</option>
    </select>
    <br>
    <label>Damage:</label>
    <input type="number" class="attack-damage" placeholder="10">
    <br>
    <label>Number of Attacks:</label>
    <input type="number" class="attack-number" placeholder="2">
    <br>
    <label for="attackAbilities">Abilities (one per line):
    <button type="button" class="info-icon" onclick="openModal('Attack Ability Information', [...attackSpecialsData, ...extraAbilititesData])" title="View Attack Ability information">ℹ️</button></label>
    <textarea id="attackAbilities" name="attackAbilities" placeholder="{WEAPON_SPECIAL_MAGICAL}" class="attack-abilities" ></textarea>
    <br>
    <button type="button" onclick="removeAttack('${attackId}')">Remove Attack</button>
  `;
  container.appendChild(div);
}

function removeAttack(attackId) {
  document.getElementById(attackId).remove();
}

function addResistance() {
  const container = document.getElementById('resistanceContainer');
  const resistanceId = `resistance_${resistanceCounter++}`;
  
  const div = document.createElement('div');
  div.id = resistanceId;
  div.style.border = '1px solid #d1ad0a';
  div.style.padding = '10px';
  div.style.margin = '10px 0';
  let html = ''
  html = `<label>Type:</label>
    <select type="text" class="resistance-type" placeholder="e.g., blade" required>`
  for (let option of attackTypesData[0].children){
    html += `<option value="${option}">${option}</option>`
  }
  html += ` </select>
    <label>Value:</label>
    <input type="number" class="resistance-value" placeholder="60" required onchange="updateUnitInfoPanel()" oninput="updateUnitInfoPanel()">
    <button type="button" onclick="removeResistance('${resistanceId}')">Remove</button>
  `;
  div.innerHTML = html
  container.appendChild(div);
}

function removeResistance(resistanceId) {
  document.getElementById(resistanceId).remove();
  updateUnitInfoPanel()
}
// Animation helpers
function addStandingFrame() {
  const container = document.getElementById('standingAnimContainer');
  const id = `standing_frame_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  const div = document.createElement('div');
  div.id = id;
  div.className = 'standing-frame';
  div.style.margin = '6px 0';
  div.innerHTML = `
    <label>Image:</label>
    <input type="text" class="standing-frame-image" placeholder="units/undead-skeletal/bone-shooter-bob-[1~8].png:[150*3,200,150*4]">
    <button type="button" onclick="document.getElementById('${id}').remove()">Remove</button>
  `;
  container.appendChild(div);
}

function addAttackAnim() {
  const container = document.getElementById('attackAnimsContainer');
  const animId = `attack_anim_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  const div = document.createElement('div');
  div.id = animId;
  div.style.border = '1px solid #d1ad0a';
  div.style.padding = '8px';
  div.style.margin = '8px 0';
  div.innerHTML = `
    <h4>Attack Anim</h4>
    <label>Filter Attack Name:</label>
    <input type="text" class="anim-filter-name" placeholder="attack name">
    <br>
    <label>Missile Start Time:</label>
    <input type="number" class="anim-missile-start-time">
    <div class="missileFrameContainer"></div>
    <button type="button" onclick="addMissileFrame('${animId}')">Add Missile Frame</button>
    <br>
    <label>Start Time:</label>
    <input type="number" class="anim-start-time">
    <br>
    <div class="animFramesContainer"></div>
    <button type="button" onclick="addAttackAnimFrame('${animId}')">Add Frame</button>
    <br>
    <button type="button" onclick="removeAttackAnim('${animId}')">Remove Anim</button>
  `;
  container.appendChild(div);
}

function removeAttackAnim(animId) {
  const el = document.getElementById(animId);
  if (el) el.remove();
}

function addAttackAnimFrame(animId) {
  const animDiv = document.getElementById(animId);
  if (!animDiv) return;
  const container = animDiv.querySelector('.animFramesContainer');
  const id = `anim_frame_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  const div = document.createElement('div');
  div.id = id;
  div.className = 'anim-frame';
  div.style.margin = '6px 0';
  div.innerHTML = `
    <label>Image:</label>
    <input type="text" class="anim-frame-image" placeholder="images/units/YoutUnit-1.png">
    <label>sound:</label>
    <input type="text" class="anim-frame-sound" placeholder=""><button type="button" class="info-icon" onclick="openModal('Sounds Information', SoundsData)" title="View Sounds information">ℹ️</button>
    <button type="button" onclick="document.getElementById('${id}').remove()">Remove</button>
  `;
  container.appendChild(div);
}

function addMissileFrame(animId) {
  const animDiv = document.getElementById(animId);
  if (!animDiv) return;
  const container = animDiv.querySelector('.missileFrameContainer');
  const id = `missile_frame_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  const div = document.createElement('div');
  div.id = id;
  div.style.margin = '6px 0';
  div.innerHTML = `
    <label>Duration:</label>
    <input type="number" class="missile-duration">
    <label>Image:</label>
    <input type="text" class="missile-image">
    <label>Image Diagonal:</label>
    <input type="text" class="missile-image-diagonal">
    <button type="button" onclick="document.getElementById('${id}').remove()">Remove</button>
  `;
  container.appendChild(div);
}

function addEraFrame() {
  const container = document.getElementById('eraFramesContainer');
  const id = `era_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  const div = document.createElement('div');
  div.id = id;
  div.classList.add('eraDisplay')
  div.style.margin = '6px 0';
  div.innerHTML = `
    <h2 id="eraTitle_${id}">Era</h2>
    <label for="eraName">Name:</label>
    <input type="text" Name="eraName" name="eraName" onChange="document.getElementById('eraTitle_${id}').textContent = 'Era: ' + this.value;" required>
    <br>
    <br>
    <div>
    <label for="defaultFactions">Add default factions:</label>
    <input type="checkbox" id="defaultFactions" name="defaultFactions">
    <br>
    <label for="defaultAoHFactions">Add default AoH factions:</label>
    <input type="checkbox" id="defaultAoHFactions" name="defaultAoHFactions">
    <br>
    <label for="extraAbilities">Add extra abilities:</label>
    <input type="checkbox" id="extraAbilities" name="extraAbilities">
    <button type="button" class="info-icon" onclick="openModal('Additional abilitites added', extraAbilititesData)" title="Extra abilitites info">ℹ️</button>
    <br>
    </div>
    <div class="factionContainer"></div>
    <br>
    <label for="additionalCode">Additional Code: (optional for you own custom abilities):</label>
    <br>
    <textarea name="additionalCode" id="additionalCode" cols="50" rows="15" placeholder="If you don't know leave empty since wrong characters can break the mod"></textarea>
    
    <button type="button" style="margin: 6px 0;" onclick="addFaction('${id}')">Add Faction</button>
    <button type="button" onclick="document.getElementById('${id}').remove()">Remove Era</button>
  `;
  container.appendChild(div);
}

function addFaction(eraId) {
  const eraDiv = document.getElementById(eraId);
  if (!eraDiv) return;
  const container = eraDiv.querySelector('.factionContainer');
  const id = `faction_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  const div = document.createElement('div');
  div.id = id;
  div.classList.add('faction-frame');
  div.innerHTML = `
    <h3 id="factionTitle_${id}" >Faction</h3>
    <label for="factionName">Name:</label>
    <input type="text" Name="factionName" name="factionName" onchange="document.getElementById('factionTitle_${id}').textContent = this.value" required >
    <label for="factionImage">Image Path:<button type="button" class="info-icon" onclick="openUnitsModal('Add By Image', (unit) => this.parentElement.nextElementSibling.value = unit.image, true);" title="Add By Image">ℹ️</button></label>
    <input type="text" Name="factionImage" name="factionImage" placeholder="units/monsters/boar/piglet.png">
    <label for="factionType">Type:(Cosmetic)</label>
    <input type="text" Name="factionType" name="factionType" placeholder="Chaotic,Neutral or Lawful">
    <label for="factionLeaders">Leaders:<button type="button" class="info-icon" onclick="openUnitsModal('Add By Image', addToFieldWithComas, true); recruitsElement = this.parentElement.nextElementSibling;" title="Add By Image">ℹ️</button></label>
    <input type="text" Name="factionLeaders" name="factionLeaders" placeholder="Ghost,Ghoul or Ghost">
    <label for="factionRecruits">Recruits:<button type="button" class="info-icon" onclick="openUnitsModal('Add By Image', addToFieldWithComas, true); recruitsElement = this.parentElement.nextElementSibling;" title="Add By Image">ℹ️</button></label>
    <input type="text" Name="factionRecruits" name="factionRecruits" placeholder="Ghost,Ghoul or Ghost">
    <label for="factionAI">AI recruit order: (usage field of units)</label>
    <input type="text" Name="factionAI" name="factionAI" placeholder="fighter,scout,archer">
    <br>
    <button type="button" onclick="document.getElementById('${id}').remove()">Remove Faction</button>
  `;
  container.appendChild(div);
}

function populateQualities() {
  const container = document.querySelector('.MTContainer');
  const containerRace = document.querySelector('.RaceContainer');
  // Clear existing movement type frames
  if (container) container.innerHTML = '';
  if (containerRace) containerRace.innerHTML = '';
  if (!selectedMod || !selectedMod.qualities) return;
  
  
  // Populate movement types if they exist
  const qualList = Object.values(selectedMod.qualities)
  if (qualList && qualList.length > 0) {
    qualList.forEach(quality => {
      switch (quality.type) {
        case 'race':
          addRace()
          const raceDivs = containerRace.querySelectorAll('.Race-frame');
          const raceDiv = raceDivs[raceDivs.length - 1];
          
          // Fill race fields
          let raceName = raceDiv.querySelector('[name="RaceName"]');
          raceName.value = quality.id || '';
          const RaceEvent = new Event('change');
          raceName.dispatchEvent(RaceEvent);
          raceDiv.querySelector('[name="race_description"]').value = quality.description || '';
          raceDiv.querySelector('[name="num_traits"]').value = quality.num_traits || '';
          raceDiv.querySelector('[name="undead_variation"]').value = quality.undead_variation || '';
          raceDiv.querySelector('[name="male_names"]').value = quality.male_names || '';
          raceDiv.querySelector('[name="female_names"]').value = quality.female_names || '';
          break;
      
        default:
          addMovementType();
          const mtDivs = container.querySelectorAll('.MT-frame');
          const mtDiv = mtDivs[mtDivs.length - 1];
          
          // Fill movement type fields
          let name = mtDiv.querySelector('[name="MTName"]');
          name.value = quality.name || '';
          const event = new Event('change');
          name.dispatchEvent(event);
          mtDiv.querySelector('[name="movementCost"]').value = quality.movementCost || '';
          mtDiv.querySelector('[name="defense"]').value = quality.defense || '';
          mtDiv.querySelector('[name="resistances"]').value = quality.resistances || '';
          break;
      }
      
    });
  }
}

function addMovementType(){
  const container = document.querySelector('.MTContainer');
  const id = `MT_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  const div = document.createElement('div');
  div.id = id;
  div.classList.add('MT-frame');
  div.innerHTML = `
    <h3 id="MTTitle_${id}">Movement Type</h3>
    <label for="MTName">Name:</label>
    <input type="text" Name="MTName" name="MTName" onchange="document.getElementById('MTTitle_${id}').textContent = 'MT:' + this.value" required>
    <label for="movementCost">Movement Costs:<button type="button" class="info-icon" onclick="openModal('Movement cost Information', MCData)" title="Add By Image">ℹ️</button></label>
    <textarea Name="movementCost" name="movementCost" rows="16" cols="50">
deep_water=
shallow_water=
reef=
swamp_water=
flat=
sand=
forest=
hills=
mountains=
village=
castle=
cave=
frozen=
unwalkable=
impassable=
fungus=</textarea>
<label for="defense">Defense:<button type="button" class="info-icon" onclick="openModal('Defense Information', MDData)" title="Add By Image">ℹ️</button></label>
    <textarea Name="defense" name="defense" rows="16" cols="50">
deep_water=
shallow_water=
reef=
swamp_water=
flat=
sand=
forest=
hills=
mountains=
village=
castle=
cave=
frozen=
unwalkable=
impassable=
fungus=</textarea>
<label for="resistances">Resistances:<button type="button" class="info-icon" onclick="openModal('resistances Information', MRData)" title="Add By Image">ℹ️</button></label>
    <textarea Name="resistances" name="resistances" rows="6" cols="50">
blade=
pierce=
impact=
fire=
cold=
arcane=</textarea>
    <button type="button" onclick="deleteContainer('${id}', 'MTName')">Remove Movemnent Type</button>
  `
  container.appendChild(div);

}

function addRace(){
  const container = document.querySelector('.RaceContainer');
  const id = `Race_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  const div = document.createElement('div');
  div.id = id;
  div.classList.add('Race-frame');
  let inner
  inner = `
    <h3 id="RaceTitle_${id}">Race</h3>
    <label for="RaceName">Name:</label>
    <input type="text" Name="RaceName" name="RaceName" onchange="document.getElementById('RaceTitle_${id}').textContent = 'Race:' + this.value" required>
    <label for="race_description">Description:</label>
    <textarea Name="race_description" name="race_description" rows="6" cols="50"></textarea>
    <label for="num_traits">Number of traits:</label>
    <input Name="num_traits" name="num_traits" type="number" value=2>
    <label for="undead_variation">Undead Varition:</label>
    <select Name="undead_variation" name="undead_variation" type="text" class="attack-range">
    <option value="">Human default</option>`
    
    for (let undead of ['bug', 'scorpion', 'dwarf', 'goblin', 'troll', 'spider', 'defend', 'gryphon', 'boar', 'fish', 'rat', 'beastrider', 'wose', 'falcon', 'drake', 'wolf', 'saurian', 'serpent', 'swimmer', 'ant', 'bat', 'horse']){
      inner += `
      <option value="${undead}">${undead}</option>
      `
      }
      
    inner +=`
    </select>
    <label for="male_names">Male Names:</label>
    <input Name="male_names" name="male_names" type="text" placeholder="name1,name2,name3">
    <label for="female_names">Female Names:</label>
    <input Name="female_names" name="female_names" type="text" placeholder="name1,name2,name3">
    <button type="button" onclick="deleteContainer('${id}', 'RaceName')">Remove Race</button>
    `
    div.innerHTML = inner
  container.appendChild(div);
}

function saveEra() {
  const eraContainer = document.getElementById('eraFramesContainer');
  if (!eraContainer || !selectedMod) return;
  
  const eras = [];
  
  // Iterate through each era div
  eraContainer.querySelectorAll(':scope > div').forEach(eraDiv => {
    const eraName = eraDiv.querySelector('[name="eraName"]').value;
    const eraId = eraName;
    const defaultFactions = eraDiv.querySelector('[name="defaultFactions"]').checked;
    const defaultAoHFactions = eraDiv.querySelector('[name="defaultAoHFactions"]').checked;
    const extraAbilities = eraDiv.querySelector('[name="extraAbilities"]').checked;
    const additionalCode = eraDiv.querySelector('[name="additionalCode"]').value;
    if (!eraId || !eraName) return; // Skip empty eras
    
    const factions = [];
    
    // Iterate through each faction in this era
    eraDiv.querySelectorAll('.factionContainer > .faction-frame').forEach(factionDiv => {
      const factionName = factionDiv.querySelector('[name="factionName"]').value;
      const factionId = factionName;
      const factionImage = factionDiv.querySelector('[name="factionImage"]').value?.replace(/\\\\/, '/').replace(/\\/g, '/');
      const factionType = factionDiv.querySelector('[name="factionType"]').value;
      const factionLeaders = factionDiv.querySelector('[name="factionLeaders"]').value;
      const factionRecruits = factionDiv.querySelector('[name="factionRecruits"]').value;
      const factionAI = factionDiv.querySelector('[name="factionAI"]').value;
      
      if (!factionId || !factionName) return; // Skip empty factions
      
      const faction = {
        id: factionId,
        name: factionName
      };
      
      if (factionImage) faction.image = factionImage;
      if (factionType) faction.type = factionType;
      if (factionLeaders) faction.leaders = factionLeaders;
      if (factionRecruits) faction.recruits = factionRecruits;
      if (factionAI) faction.ai = factionAI;
      
      factions.push(faction);
    });
    
    const era = {
      id: eraId,
      name: eraName,
      defaultFactions: defaultFactions,
      defaultAoHFactions: defaultAoHFactions,
      extraAbilities: extraAbilities,
      factions: factions,
      additionalCode: additionalCode
    };
    
    eras.push(era);
  });
  
  // Save eras to selected mod
  if (eras.length > 0) {
    selectedMod.eras = eras;
  } else {
    delete selectedMod.eras; // Remove if no eras
  }
  
  // Persist to localStorage
  localStorage.setItem('data', JSON.stringify(data));
  alert('Eras saved:', eras);
}

// TODO: FIX
function deleteContainer(id, name){
  const div = document.getElementById(id)
  const Ename = div.querySelector('[name="'+name+'"]')
  if (selectedMod.qualities && Object.keys(selectedMod.qualities).includes(Ename.value)) {
    delete selectedMod.qualities[Ename.value] 
  }
  div.remove()
}

function saveQualities(){
  const container = document.querySelector('.MTContainer');
  const qualities = {};
  if (container && selectedMod) {
    
    // Iterate through each movement type div
    container.querySelectorAll('.MT-frame').forEach(mtDiv => {
      const mtName = mtDiv.querySelector('[name="MTName"]').value;
      
      if (!mtName) return; // Skip empty movement types
      
      // Parse movement costs
      const movementCostText = mtDiv.querySelector('[name="movementCost"]').value || '';
      const defenseText = mtDiv.querySelector('[name="defense"]').value || '';
      const resistancesText = mtDiv.querySelector('[name="resistances"]').value || '';
      
      const movementType = {
        name: mtName,
        type: 'mt'
      };
      
      if (movementCostText.length > 0) movementType.movementCost = movementCostText;
      if (defenseText.length > 0) movementType.defense = defenseText;
      if (resistancesText.length > 0) movementType.resistances = resistancesText;
      
      qualities[mtName] = movementType;
    });

  }
  
  const raceContainer = document.querySelector('.RaceContainer');
  if (raceContainer && selectedMod){
    raceContainer.querySelectorAll('.Race-frame').forEach(raceDiv =>{
      const mtName = raceDiv.querySelector('[name="RaceName"]').value;
      
      if (!mtName) return; // Skip empty movement types

      const description = raceDiv.querySelector('[name="race_description"]').value || '';
      const num_traits = raceDiv.querySelector('[name="num_traits"]').value || '';
      const undead_variation = raceDiv.querySelector('[name="undead_variation"]').value || '';
      const male_names = raceDiv.querySelector('[name="male_names"]').value || '';
      const female_names = raceDiv.querySelector('[name="female_names"]').value || '';

      const race = {
        id: mtName,
        type: 'race'
      }

      if (description.length > 0) race.description = description;
      race.num_traits = num_traits;
      if (undead_variation.length > 0) race.undead_variation = undead_variation;
      if (male_names.length > 0) race.male_names = male_names;
      if (female_names.length > 0) race.female_names = female_names;

      qualities[mtName] = race;
    })
  }
  selectedMod.qualities = qualities
  
  // Persist to localStorage
  localStorage.setItem('data', JSON.stringify(data));
  alert('Qualities saved');
}

// Handle unit form submission
document.addEventListener('DOMContentLoaded', function() {
  const unitForm = document.getElementById('UnitForm');
  if (unitForm) {
    unitForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Collect form data
      const formData = new FormData(unitForm);
      const newUnit = {
        id: `${selectedMod.name}_${formData.get('unitName').replaceAll(' ', "_")}`,
        name: formData.get('unitName'),
        race: formData.get('unitRace') || null,
        unitDefaultAnimation: formData.get('unitDefaultAnimation') || null,
        image: formData.get('unitImage') || null,
        profile: formData.get('unitProfile') || null,
        hitpoints: formData.get('unitHitpoints') ? parseInt(formData.get('unitHitpoints')) : null,
        movement: formData.get('unitMovement') ? parseInt(formData.get('unitMovement')) : 0,
        movement_type: formData.get('unitMovementType') || null,
        cost: formData.get('unitCost') ? parseInt(formData.get('unitCost')) : 0,
        level: formData.get('unitLevel') ? parseInt(formData.get('unitLevel')) : 0,
        experience: formData.get('unitExperience') ? parseInt(formData.get('unitExperience')) : null,
        alignment: formData.get('unitAlignment') || null,
        advances_to: formData.get('unitAdvancesTo') || null,
        description: formData.get('unitDescription') || null,
        usage: formData.get('unitUsage') || null,
        die_sound: formData.get('unitDieSound') || null
      };

      // Collect attacks
      const attacks = [];
      document.querySelectorAll('#attacksContainer > div').forEach(attackDiv => {
        const abilitiesText = attackDiv.querySelector('.attack-abilities').value || '';
        const abilities = abilitiesText
          .split('\n')
          .map(line => line.trim())
          .filter(line => line);
        const attack = {
          name: attackDiv.querySelector('.attack-name').value || null,
          icon: attackDiv.querySelector('.attack-icon').value || null,
          type: attackDiv.querySelector('.attack-type').value || null,
          range: attackDiv.querySelector('.attack-range').value || null,
          damage: attackDiv.querySelector('.attack-damage').value ? parseInt(attackDiv.querySelector('.attack-damage').value) : null,
          number: attackDiv.querySelector('.attack-number').value ? parseInt(attackDiv.querySelector('.attack-number').value) : null,
          abilities: abilities || null
        };
        if (attack.name || attack.id) attacks.push(attack);
      });
      if (attacks.length > 0) newUnit.attacks = attacks;

      // Collect resistance
      const resistance = {};
      document.querySelectorAll('#resistanceContainer > div').forEach(resistDiv => {
        const type = resistDiv.querySelector('.resistance-type').value;
        const value = resistDiv.querySelector('.resistance-value').value;
        if (type && value) {
          resistance[type] = parseInt(value);
        }
      });
      if (Object.keys(resistance).length > 0) newUnit.resistance = resistance;

      const codeBlock = formData.get('codeBlock') || '';
      if (codeBlock) newUnit.codeBlock = codeBlock
      // Collect abilities
      const abilitiesText = formData.get('unitAbilities') || '';
      const abilities = abilitiesText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line);
      if (abilities.length > 0) newUnit.abilities = abilities;

      // Collect BlockAnim
      if (blockText){
        newUnit.blockAnimations = blockText;
        blockText = '';
      }

      // Collect standing animation
      const standingStart = document.getElementById('standingStartTime').value;
      const standingFrames = [];
      document.querySelectorAll('#standingAnimContainer > .standing-frame').forEach(frDiv => {
        const img = frDiv.querySelector('.standing-frame-image').value;
        if (img) standingFrames.push({ image: img });
      });
      if (standingStart || standingFrames.length > 0) {
        newUnit.standing_anim = {};
        if (standingStart) newUnit.standing_anim.start_time = parseInt(standingStart);
        if (standingFrames.length > 0) newUnit.standing_anim.frames = standingFrames;
      }

      // Collect attack animations
      const attackAnims = [];
      document.querySelectorAll('#attackAnimsContainer > div').forEach(animDiv => {
        const anim = {};
        const filterName = animDiv.querySelector('.anim-filter-name').value;
        if (filterName) anim.filter_attack = { name: filterName };
        const msStart = animDiv.querySelector('.anim-missile-start-time').value;
        if (msStart) anim.missile_start_time = parseInt(msStart);
        const startTime = animDiv.querySelector('.anim-start-time').value;
        if (startTime) anim.start_time = parseInt(startTime);

        // missile frame (first only)
        const mf = animDiv.querySelector('.missileFrameContainer > div');
        if (mf) {
          const missile = {};
          const dur = mf.querySelector('.missile-duration').value;
          const img = mf.querySelector('.missile-image').value;
          const imgd = mf.querySelector('.missile-image-diagonal').value;
          if (dur) missile.duration = parseInt(dur);
          if (img) missile.image = img;
          if (imgd) missile.image_diagonal = imgd;
          if (Object.keys(missile).length > 0) anim.missile_frame = missile;
        }

        // frames
        const frames = [];
        animDiv.querySelectorAll('.anim-frame').forEach(frameEl => {
          const img = frameEl.querySelector('.anim-frame-image').value;
          const sound = frameEl.querySelector('.anim-frame-sound').value;
          const obj = {}
          if (img) obj.image= img ;
          if (sound) obj.sound= sound ;
          if (obj) frames.push(obj)
        });
        if (frames.length > 0) anim.frames = frames;

        if (Object.keys(anim).length > 0) attackAnims.push(anim);
      });
      if (attackAnims.length > 0) newUnit.attack_anims = attackAnims;

      // Add or update unit in selected mod (use id-keyed object)
      if (selectedMod) {
        // If editing and id changed, remove old key
        if (selectedUnit && selectedUnit.id && selectedUnit.id !== newUnit.id) {
          delete selectedMod.units[selectedUnit.id];
        }
        console.log('Saving unit:', newUnit);
        selectedMod.units[newUnit.id] = newUnit;
        unitForm.reset();
        document.getElementById('attacksContainer').innerHTML = '';
        document.getElementById('resistanceContainer').innerHTML = '';
        document.getElementById('standingAnimContainer').innerHTML = '';
        document.getElementById('attackAnimsContainer').innerHTML = '';
        attackCounter = 0;
        resistanceCounter = 0;
        selectedUnit = null;
        localStorage.setItem('selectedUnit', null);
        localStorage.setItem('data', JSON.stringify(data));
        showPage('unitsPage');
      }
    });
  }
});

unitAnimDefaultClick = (unit) => {
  if (typeof unit === 'string') {
    unit = unitsData[unit];
  }
  document.getElementById('unitDefaultAnimation').value = unit.id; 
  document.getElementById('unitImage').value = unit.image || '';
  document.getElementById('unitProfile').value = unit.profile || '';
  
  blockText = '';
  if (unit.attack_anim) {
    addToBlockText(unit.attack_anim);
    let attackAnimName = Array.from(new Set(Array.from(blockText.matchAll(/name=*([^\n\r]+)/g)).map(m => m[1])));
    
    document.getElementById('attackTitle').textContent = `⚡ Attacks (with animations for names: ${attackAnimName.join(',') || ''})`;
  }
  if (unit.standing_anim) {
    addToBlockText(unit.standing_anim);
  }
  if (unit.movement_anim) {
    addToBlockText(unit.movement_anim);
  }
  updateUnitInfoPanel()
}
// Populate unit default animations selection dropdown
const unitAnimInput = document.getElementById('unitDefaultAnimation');
for (const unit of Object.values(unitsData)) {
  const option = document.createElement('option');
  option.value = unit.id;
  option.textContent = unit.id;
  unitAnimInput.appendChild(option);
}
populateModList();
showPage(localStorage.getItem('lastPage') || 'mainPage');