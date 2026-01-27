const resistanceDict = {
    "smallfoot": {
        "blade": 100,
        "pierce": 100,
        "impact": 100,
        "fire": 100,
        "cold": 100,
        "arcane": 90
    },
    "orcishfoot": {
        "blade": 100,
        "pierce": 100,
        "impact": 100,
        "fire": 100,
        "cold": 100,
        "arcane": 100
    },
    "largefoot": {
        "blade": 80,
        "pierce": 80,
        "impact": 100,
        "fire": 100,
        "cold": 100,
        "arcane": 110
    },
    "armoredfoot": {
        "blade": 50,
        "pierce": 60,
        "impact": 90,
        "fire": 110,
        "cold": 100,
        "arcane": 90
    },
    "elusivefoot": {
        "blade": 130,
        "pierce": 120,
        "impact": 120,
        "fire": 100,
        "cold": 100,
        "arcane": 90
    },
    "mounted": {
        "blade": 80,
        "pierce": 120,
        "impact": 70,
        "fire": 100,
        "cold": 100,
        "arcane": 90
    },
    "woodland": {
        "blade": 100,
        "pierce": 40,
        "impact": 60,
        "fire": 150,
        "cold": 100,
        "arcane": 120
    },
    "lightfly": {
        "blade": 100,
        "pierce": 100,
        "impact": 110,
        "fire": 100,
        "cold": 100,
        "arcane": 90
    },
    "deepsea": {
        "blade": 80,
        "pierce": 100,
        "impact": 70,
        "fire": 100,
        "cold": 40,
        "arcane": 90
    },
    "swimmer": {
        "blade": 100,
        "pierce": 100,
        "impact": 100,
        "fire": 100,
        "cold": 80,
        "arcane": 100
    },
    "naga": {
        "blade": 100,
        "pierce": 100,
        "impact": 100,
        "fire": 100,
        "cold": 100,
        "arcane": 100
    },
    "float": {
        "blade": 100,
        "pierce": 100,
        "impact": 110,
        "fire": 100,
        "cold": 100,
        "arcane": 40
    },
    "mountainfoot": {
        "blade": 100,
        "pierce": 100,
        "impact": 100,
        "fire": 100,
        "cold": 100,
        "arcane": 90
    },
    "dwarvishfoot": {
        "blade": 80,
        "pierce": 80,
        "impact": 80,
        "fire": 90,
        "cold": 90,
        "arcane": 90
    },
    "gruefoot": {
        "blade": 90,
        "pierce": 70,
        "impact": 100,
        "fire": 90,
        "cold": 60,
        "arcane": 90
    },
    "undeadfoot": {
        "blade": 90,
        "pierce": 70,
        "impact": 110,
        "fire": 120,
        "cold": 40,
        "arcane": 120
    },
    "undeadfly": {
        "blade": 100,
        "pierce": 100,
        "impact": 100,
        "fire": 120,
        "cold": 40,
        "arcane": 120
    },
    "undeadspirit": {
        "blade": 50,
        "pierce": 50,
        "impact": 50,
        "fire": 90,
        "cold": 30,
        "arcane": 110
    },
    "spirit": {
        "blade": 40,
        "pierce": 40,
        "impact": 40,
        "fire": 100,
        "cold": 30,
        "arcane": 100
    },
    "lizard": {
        "blade": 110,
        "pierce": 80,
        "impact": 110,
        "fire": 120,
        "cold": 120,
        "arcane": 90
    },
    "scuttlefoot": {
        "blade": 90,
        "pierce": 90,
        "impact": 30,
        "fire": 200,
        "cold": 120,
        "arcane": 150
    },
    "rodentfoot": {
        "blade": 100,
        "pierce": 100,
        "impact": 100,
        "fire": 100,
        "cold": 90,
        "arcane": 90
    },
    "drakefoot": {
        "blade": 80,
        "pierce": 100,
        "impact": 70,
        "fire": 50,
        "cold": 150,
        "arcane": 110
    },
    "dunefoot": {
        "blade": 100,
        "pierce": 100,
        "impact": 100,
        "fire": 100,
        "cold": 100,
        "arcane": 90
    },
    "duneelusivef": {
        "blade": 110,
        "pierce": 110,
        "impact": 110,
        "fire": 100,
        "cold": 100,
        "arcane": 90
    },
    "dunearmoredf": {
        "blade": 80,
        "pierce": 80,
        "impact": 110,
        "fire": 100,
        "cold": 100,
        "arcane": 90
    },
    "dunehorse": {
        "blade": 100,
        "pierce": 120,
        "impact": 90,
        "fire": 100,
        "cold": 100,
        "arcane": 90
    },
    "dunearmoredh": {
        "blade": 80,
        "pierce": 120,
        "impact": 80,
        "fire": 100,
        "cold": 100,
        "arcane": 90
    }
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

const unitsData = {
  "Blood Bat": {
    "id": "Blood Bat",
    "image": "units/bats/bloodbat-se-3.png",
    "profile": "portraits/monsters/bat-red.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        direction=s,se,sw\n        offset=0.0~0.9:200,0.9~0.0:160\n        start_time=-200\n        [frame]\n            image=\"units/bats/bloodbat-se-[3,2].png:30\"\n        [/frame]\n        [frame]\n            image=\"units/bats/bloodbat-se-1.png:30\"\n            sound=bat-flapping.wav\n        [/frame]\n        [frame]\n            image=\"units/bats/bloodbat-se-[2~4,3,2,3].png:[30*2,70,50*2,40]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        direction=n,ne,nw\n        offset=0.0~0.9:200,0.9~0.0:160\n        start_time=-200\n        [frame]\n            image=\"units/bats/bloodbat-ne-[3,2].png:30\"\n        [/frame]\n        [frame]\n            image=\"units/bats/bloodbat-ne-1.png:30\"\n            sound=bat-flapping.wav\n        [/frame]\n        [frame]\n            image=\"units/bats/bloodbat-ne-[2~4,3,2,3].png:[30*2,70,50*2,40]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        layer=60\n        direction=s,se,sw\n        start_time=0\n        [frame]\n            image=\"units/bats/bloodbat-se-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        direction=n,ne,nw\n        layer=60\n        start_time=0\n        [frame]\n            image=\"units/bats/bloodbat-ne-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        direction=s,se,sw\n        start_time=0\n        [frame]\n            image=\"units/bats/bloodbat-se-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        direction=n,ne,nw\n        start_time=0\n        [frame]\n            image=\"units/bats/bloodbat-ne-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Dread Bat": {
    "id": "Dread Bat",
    "image": "units/bats/dreadbat-se-3.png",
    "profile": "portraits/monsters/bat-dread.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        direction=s,se,sw\n        offset=0.0~0.9:200,0.9~0.0:160\n        start_time=-200\n        [frame]\n            image=\"units/bats/dreadbat-se-[3,2].png:30\"\n        [/frame]\n        [frame]\n            image=\"units/bats/dreadbat-se-1.png:30\"\n            sound=bat-flapping.wav\n        [/frame]\n\n        [frame]\n            image=\"units/bats/dreadbat-se-[2~4,3,2,3].png:[30*2,70,50*2,40]\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        direction=n,ne,nw\n        offset=0.0~0.9:200,0.9~0.0:160\n        start_time=-200\n        [frame]\n            image=\"units/bats/dreadbat-ne-[3,2].png:30\"\n        [/frame]\n        [frame]\n            image=\"units/bats/dreadbat-ne-1.png:30\"\n            sound=bat-flapping.wav\n        [/frame]\n        [frame]\n            image=\"units/bats/dreadbat-ne-[2~4,3,2,3].png:[30*2,70,50*2,40]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        layer=60\n        direction=s,se,sw\n        start_time=0\n        [frame]\n            image=\"units/bats/dreadbat-se-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        layer=60\n        direction=n,ne,nw\n        start_time=0\n        [frame]\n            image=\"units/bats/dreadbat-ne-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        direction=s,se,sw\n        start_time=0\n        [frame]\n            image=\"units/bats/dreadbat-se-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        direction=n,ne,nw\n        start_time=0\n        [frame]\n            image=\"units/bats/dreadbat-ne-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Vampire Bat": {
    "id": "Vampire Bat",
    "image": "units/bats/bat-se-3.png",
    "profile": "portraits/monsters/bat.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        direction=s,se,sw\n        offset=0.0~0.9:200,0.9~0.0:160\n        start_time=-200\n        [frame]\n            image=\"units/bats/bat-se-[3,2].png:30\"\n        [/frame]\n        [frame]\n            image=\"units/bats/bat-se-1.png:30\"\n            sound=bat-flapping.wav\n        [/frame]\n        [frame]\n            image=\"units/bats/bat-se-[2~4,3,2,3].png:[30*2,70,50*2,40]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        direction=n,ne,nw\n        offset=0.0~0.9:200,0.9~0.0:160\n        start_time=-200\n        [frame]\n            image=\"units/bats/bat-ne-[3,2].png:30\"\n        [/frame]\n        [frame]\n            image=\"units/bats/bat-ne-1.png:30\"\n            sound=bat-flapping.wav\n        [/frame]\n        [frame]\n            image=\"units/bats/bat-ne-[2~4,3,2,3].png:[30*2,70,50*2,40]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        direction=s,se,sw\n        start_time=0\n        layer=60\n        [frame]\n            image=\"units/bats/bat-se-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        layer=60\n        direction=n,ne,nw\n        start_time=0\n        [frame]\n            image=\"units/bats/bat-ne-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        direction=s,se,sw\n        start_time=0\n        [frame]\n            image=\"units/bats/bat-se-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        direction=n,ne,nw\n        start_time=0\n        [frame]\n            image=\"units/bats/bat-ne-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Boat": {
    "id": "Boat",
    "image": "units/transport/boat.png",
    "level": "1"
  },
  "Galleon": {
    "id": "Galleon",
    "image": "units/transport/galleon.png",
    "level": "1"
  },
  "Pirate Galleon": {
    "id": "Pirate Galleon",
    "image": "units/transport/pirate-galleon.png",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=ballista\n        [/filter_attack]\n        missile_start_time=-50\n        [missile_frame]\n            duration=50\n            image=\"projectiles/bullet.png\"\n            image_diagonal=\"projectiles/bullet.png\"\n        [/missile_frame]\n    [/attack_anim]"
    ]
  },
  "Transport Galleon": {
    "id": "Transport Galleon",
    "image": "units/transport/transport-galleon.png",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=ballista\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/bullet.png\"\n            image_diagonal=\"projectiles/bullet.png\"\n        [/missile_frame]\n    [/attack_anim]"
    ]
  },
  "Drake Arbiter": {
    "id": "Drake Arbiter",
    "image": "units/drakes/arbiter.png",
    "profile": "portraits/drakes/warden.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=pierce\n        [/filter_attack]\n        direction=s\n        offset=0.0~0.1,0.1~0.0\n        [if]\n            terrain_type=W*,S*\n            submerge=0.4\n        [/if]\n        start_time=-300\n        [frame]\n            image=\"units/drakes/arbiter.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/arbiter-pierce-se-[1~2].png:100,units/drakes/arbiter-pierce-s-[3~7].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -150}\n        [frame]\n            image=\"units/drakes/arbiter.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=pierce\n        [/filter_attack]\n        direction=se,sw\n        offset=0.0~0.1,0.1~0.0\n        [if]\n            terrain_type=W*,S*\n            submerge=0.4\n        [/if]\n        start_time=-300\n        [frame]\n            image=\"units/drakes/arbiter.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/arbiter-pierce-se-[1~7].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -150}\n        [frame]\n            image=\"units/drakes/arbiter.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=pierce\n        [/filter_attack]\n        direction=ne,n,nw\n        start_time=0\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg 0}\n        [frame]\n            image=\"units/drakes/arbiter.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=blade\n        [/filter_attack]\n        direction=s\n        offset=0.0~0.1,0.1~0.0\n        [if]\n            terrain_type=W*,S*\n            submerge=0.4\n        [/if]\n        start_time=-300\n        [frame]\n            image=\"units/drakes/arbiter.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/arbiter-blade-se-[1~3].png:100,units/drakes/arbiter-blade-s-[4~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n        [frame]\n            image=\"units/drakes/arbiter.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=blade\n        [/filter_attack]\n        direction=se,sw\n        offset=0.0~0.1,0.1~0.0\n        [if]\n            terrain_type=W*,S*\n            submerge=0.4\n        [/if]\n        start_time=-300\n        [frame]\n            image=\"units/drakes/arbiter.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/arbiter-blade-se-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n        [frame]\n            image=\"units/drakes/arbiter.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=blade\n        [/filter_attack]\n        direction=ne,n,nw\n        start_time=0\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n        [frame]\n            image=\"units/drakes/arbiter.png:100\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Armageddon Drake": {
    "id": "Armageddon Drake",
    "image": "units/drakes/armageddon.png",
    "profile": "portraits/drakes/inferno.webp",
    "level": "4",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=battle claws\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-300\n        [frame]\n            image=\"units/drakes/armageddon-melee-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Drake Blademaster": {
    "id": "Drake Blademaster",
    "image": "units/drakes/blademaster.png",
    "profile": "portraits/drakes/blademaster.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=war talon\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-400\n        [frame]\n            image=\"units/drakes/blademaster-melee-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Drake Burner": {
    "id": "Drake Burner",
    "image": "units/drakes/burner.png",
    "profile": "portraits/drakes/burner.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-300\n        [frame]\n            image=\"units/drakes/burner.png\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/burner-melee-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/drakes/burner.png\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Drake Clasher": {
    "id": "Drake Clasher",
    "image": "units/drakes/clasher.png",
    "profile": "portraits/drakes/clasher.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        direction=s\n        offset=0.0~0.1:200,0.1~0.4:150,0.4~0.0:150\n        start_time=-300\n        [frame]\n            image=\"units/drakes/clasher-spear-se-1.png:100,units/drakes/clasher-spear-s-[2~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        direction=se,sw\n        offset=0.0~0.0:200,0.0~0.2:150,0.2~0.0:150\n        start_time=-300\n        [frame]\n            image=\"units/drakes/clasher-spear-se-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        direction=ne,n,nw\n        start_time=-300\n        [frame]\n            image=\"units/drakes/clasher.png:200\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n        [frame]\n            image=\"units/drakes/clasher.png:400\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=war talon\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-300\n        [frame]\n            image=\"units/drakes/clasher-blade.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/clasher-blade-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -75}\n        [frame]\n            image=\"units/drakes/clasher-blade.png:100\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Drake Enforcer": {
    "id": "Drake Enforcer",
    "image": "units/drakes/enforcer.png",
    "profile": "portraits/drakes/enforcer.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=trident\n        [/filter_attack]\n        direction=s\n        offset=0.0~0.1:200,0.1~0.4:150,0.4~0.0:150\n        start_time=-300\n        [frame]\n            image=\"units/drakes/enforcer-spear-se-1.png,units/drakes/enforcer-spear-s-[2~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=trident\n        [/filter_attack]\n        direction=se,sw,ne,n,nw\n        offset=0.0~0.0:200,0.0~0.2:150,0.2~0.0:150\n        start_time=-300\n        [frame]\n            image=\"units/drakes/enforcer-spear-se-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=war talon\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-300\n        [frame]\n            image=\"units/drakes/enforcer-blade.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/enforcer-blade-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -75}\n        [frame]\n            image=\"units/drakes/enforcer-blade.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=ram\n        [/filter_attack]\n        offset=0.0~0.1:200,0.1~0.7:200,0.7~0.0:100\n        start_time=-300\n        [frame]\n            image=\"units/drakes/enforcer-blade.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/enforcer-impact-[1~5].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n        [frame]\n            image=\"units/drakes/enforcer-blade.png:100\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Drake Fighter": {
    "id": "Drake Fighter",
    "image": "units/drakes/fighter.png",
    "profile": "portraits/drakes/fighter.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=war blade\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-400\n        [frame]\n            image=\"units/drakes/fighter.png\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/fighter-melee-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/drakes/fighter.png\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Fire Drake": {
    "id": "Fire Drake",
    "image": "units/drakes/fire.png",
    "profile": "portraits/drakes/inferno.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=battle claws\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-300\n        [frame]\n            image=\"units/drakes/fire-melee-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Drake Flameheart": {
    "id": "Drake Flameheart",
    "image": "units/drakes/flameheart.png",
    "profile": "portraits/drakes/flameheart.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=war blade\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-300\n        [frame]\n            image=\"units/drakes/flameheart-melee-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Drake Flare": {
    "id": "Drake Flare",
    "image": "units/drakes/flare.png",
    "profile": "portraits/drakes/flameheart.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=war blade\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-300\n        [frame]\n            image=\"units/drakes/flare-melee-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Drake Glider": {
    "id": "Drake Glider",
    "image": "units/drakes/glider.png",
    "profile": "portraits/drakes/glider.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=slam\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-400\n        [frame]\n            image=\"units/drakes/glider-kick-[1~6,2].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS club.ogg {SOUND_LIST:MISS} -200}\n    [/attack_anim]"
    ]
  },
  "Hurricane Drake": {
    "id": "Hurricane Drake",
    "image": "units/drakes/hurricane.png",
    "profile": "portraits/drakes/hurricane.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=slam\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-400\n        [frame]\n            image=\"units/drakes/hurricane-kick-[1~6,2].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS club.ogg {SOUND_LIST:MISS} -200}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        submerge=0.01\n        layer=60\n        # wmlscope: start ignoring\n        [frame]\n            image=\"units/drakes/hurricane-fly-[1~5,4].png:100,units/drakes/hurricane-fly-[3,2]-upstroke.png:100\"\n        [/frame]\n        # wmlscope: stop ignoring\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        submerge=0.01\n        # wmlscope: start ignoring\n        [frame]\n            image=\"units/drakes/hurricane-fly-[1~5,4].png:100,units/drakes/hurricane-fly-[3,2]-upstroke.png:100\"\n        [/frame]\n        # wmlscope: stop ignoring\n    [/movement_anim]"
    ]
  },
  "Inferno Drake": {
    "id": "Inferno Drake",
    "image": "units/drakes/inferno.png",
    "profile": "portraits/drakes/inferno.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=battle claws\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-300\n        [frame]\n            image=\"units/drakes/inferno-melee-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Sky Drake": {
    "id": "Sky Drake",
    "image": "units/drakes/sky.png",
    "profile": "portraits/drakes/hurricane.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=slam\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-400\n        [frame]\n            image=\"units/drakes/sky-kick-[1~6,2].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS club.ogg {SOUND_LIST:MISS} -200}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        submerge=0.01\n        layer=60\n        # wmlscope: start ignoring\n        [frame]\n            image=\"units/drakes/sky-fly-[1~5,4].png:100,units/drakes/sky-fly-[3,2]-upstroke.png:100\"\n        [/frame]\n        # wmlscope: stop ignoring\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        submerge=0.01\n        # wmlscope: start ignoring\n        [frame]\n            image=\"units/drakes/sky-fly-[1~5,4].png:100,units/drakes/sky-fly-[3,2]-upstroke.png:100\"\n        [/frame]\n        # wmlscope: stop ignoring\n    [/movement_anim]"
    ]
  },
  "Drake Thrasher": {
    "id": "Drake Thrasher",
    "image": "units/drakes/slasher.png",
    "profile": "portraits/drakes/enforcer.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        direction=s\n        offset=0.0~0.1:200,0.1~0.4:150,0.4~0.0:150\n        start_time=-300\n        [frame]\n            image=\"units/drakes/thrasher-spear-se-1.png,units/drakes/thrasher-spear-s-[2~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        direction=se,sw,ne,n,nw\n        offset=0.0~0.0:200,0.0~0.2:150,0.2~0.0:150\n        start_time=-300\n        [frame]\n            image=\"units/drakes/thrasher-spear-se-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=war talon\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-300\n        [frame]\n            image=\"units/drakes/thrasher-blade.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/thrasher-blade-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -75}\n        [frame]\n            image=\"units/drakes/thrasher-blade.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=ram\n        [/filter_attack]\n        offset=0.0~0.1:200,0.1~0.7:200,0.7~0.0:100\n        start_time=-300\n        [frame]\n            image=\"units/drakes/thrasher-blade.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/thrasher-impact-[1~5].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n        [frame]\n            image=\"units/drakes/thrasher-blade.png:100\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Drake Warden": {
    "id": "Drake Warden",
    "image": "units/drakes/warden.png",
    "profile": "portraits/drakes/warden.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=pierce\n        [/filter_attack]\n        direction=s\n        offset=0.0~0.1,0.1~0.0\n        [if]\n            terrain_type=W*,S*\n            submerge=0.4~0.425\n        [/if]\n        start_time=-300\n        [frame]\n            image=\"units/drakes/warden.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/warden-pierce-se-[1~2].png:100,units/drakes/warden-pierce-s-[3~7].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -150}\n        [frame]\n            image=\"units/drakes/warden.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=pierce\n        [/filter_attack]\n        direction=se,sw\n        offset=0.0~0.1,0.1~0.0\n        [if]\n            terrain_type=W*,S*\n            submerge=0.4~0.425\n        [/if]\n        start_time=-300\n        [frame]\n            image=\"units/drakes/warden.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/warden-pierce-se-[1~7].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -150}\n        [frame]\n            image=\"units/drakes/warden.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=pierce\n        [/filter_attack]\n        direction=ne,n,nw\n        start_time=0\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg 0}\n        [frame]\n            image=\"units/drakes/warden.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=blade\n        [/filter_attack]\n        direction=s\n        offset=0.0~0.1,0.1~0.0\n        [if]\n            terrain_type=W*,S*\n            submerge=0.4~0.35\n        [/if]\n        start_time=-300\n        [frame]\n            image=\"units/drakes/warden.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/warden-blade-se-[1~3].png:100,units/drakes/warden-blade-s-[4~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n        [frame]\n            image=\"units/drakes/warden.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=blade\n        [/filter_attack]\n        direction=se,sw\n        offset=0.0~0.1,0.1~0.0\n        [if]\n            terrain_type=W*,S*\n            submerge=0.4~0.35\n        [/if]\n        start_time=-300\n        [frame]\n            image=\"units/drakes/warden.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/drakes/warden-blade-se-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n        [frame]\n            image=\"units/drakes/warden.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=blade\n        [/filter_attack]\n        direction=ne,n,nw\n        start_time=0\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n        [frame]\n            image=\"units/drakes/warden.png:100\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Drake Warrior": {
    "id": "Drake Warrior",
    "image": "units/drakes/warrior.png",
    "profile": "portraits/drakes/fighter.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=war blade\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.7,0.7~0.2,0.2~0.0\n        start_time=-400\n        [frame]\n            image=\"units/drakes/warrior-melee-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Dune Alchemist": {
    "id": "Dune Alchemist",
    "image": "units/dunefolk/herbalist/alchemist.png",
    "profile": "portraits/dunefolk/herbalist.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}alchemist.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=blowgun\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/bullet.png\"\n            image_diagonal=\"projectiles/bullet.png\"\n        [/missile_frame]\n        start_time=-300\n        [frame]\n            image=\"{PATH_TEMP}alchemist.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}\n    [/attack_anim]"
    ]
  },
  "Dune Apothecary": {
    "id": "Dune Apothecary",
    "image": "units/dunefolk/herbalist/apothecary.png",
    "profile": "portraits/dunefolk/herbalist.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}apothecary.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Dune Blademaster": {
    "id": "Dune Blademaster",
    "image": "units/dunefolk/soldier/blademaster.png",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}blademaster.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Dune Burner": {
    "id": "Dune Burner",
    "image": "units/dunefolk/burner/burner.png",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}burner.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav dagger-swish.wav -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=bomb\n        [/filter_attack]\n        start_time=-500\n        missile_start_time=-200\n        [if]\n            hits=yes\n            [missile_frame]\n                duration=200\n                image=\"projectiles/naphtha-gob-n.png\"\n                # image_diagonal=\"projectiles/naphtha-gob-ne.png\" # this is just a symmetric ball for now, but will probably change\n                offset=0~0.8\n                y=-5~-45:100,-45~-5:100\n            [/missile_frame]\n            {FIRE_BURST_SMALL}\n            [+missile_frame]\n                y=-5~20\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}burner-fire[1~8].png:[100*8]\"\n                sound=bow-puny-fire.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                duration=200\n                image=\"projectiles/naphtha-gob-n.png\"\n                # image_diagonal=\"projectiles/naphtha-gob-ne.png\"\n                y=-5~-45:100,-45~-5:100\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}burner-fire[1~8].png:[100*8]\"\n                sound=bow-puny-fire-miss.ogg\n            [/frame]\n        [/else]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=dagger\n            [/filter_attack]\n            start_time=-200\n            [frame]\n                image=\"{PATH_TEMP}burner+female.png:300\"\n            [/frame]\n            {SOUND:HIT_AND_MISS dagger-swish.wav dagger-swish.wav -150}\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=bomb\n            [/filter_attack]\n            start_time=-500\n            missile_start_time=-200\n            [if]\n                hits=yes\n                [missile_frame]\n                    duration=150\n                    image=\"projectiles/naphtha-gob-n.png\"\n                    offset=0~0.8\n                    y=-5~-45:100,-45~-5:100\n                [/missile_frame]\n                {FIRE_BURST_SMALL}\n                [+missile_frame]\n                    y=-5~20\n                [/missile_frame]\n                [frame]\n                    image=\"{PATH_TEMP}burner+female-fire[1~8].png:[100*8]\"\n                    sound=bow-puny-fire.ogg\n                [/frame]\n            [/if]\n            [else]\n                hits=no\n                [missile_frame]\n                    duration=150\n                    image=\"projectiles/naphtha-gob-n.png\"\n                    y=-5~-45:100,-45~-5:100\n                [/missile_frame]\n                [frame]\n                    image=\"{PATH_TEMP}burner+female-fire[1~8].png:[100*8]\"\n                    sound=bow-puny-fire-miss.ogg\n                [/frame]\n            [/else]\n        [/attack_anim]"
    ]
  },
  "Dune Captain": {
    "id": "Dune Captain",
    "image": "units/dunefolk/soldier/captain.png",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=scimitar\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}captain.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Dune Cataphract": {
    "id": "Dune Cataphract",
    "image": "units/dunefolk/rider/cataphract.png",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace\n        [/filter_attack]\n        start_time=-250\n        horse_sound_start_time=-250\n        [frame]\n            image=\"{PATH_TEMP}cataphract-mace.png:300\"\n        [/frame]\n        [horse_sound_frame]\n            sound=horse-canter.wav\n        [/horse_sound_frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=lance\n        [/filter_attack]\n        start_time=-250\n        horse_sound_start_time=-250\n        [frame]\n            image=\"{PATH_TEMP}cataphract-lance.png:300\"\n        [/frame]\n        [horse_sound_frame]\n            sound=horse-canter.wav\n        [/horse_sound_frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=composite bow\n        [/filter_attack]\n        start_time=-250\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"{PATH_TEMP}cataphract-bow.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow-puny.ogg bow-puny-miss.ogg -225}\n    [/attack_anim]"
    ]
  },
  "Dune Explorer": {
    "id": "Dune Explorer",
    "image": "units/dunefolk/rover/explorer.png",
    "profile": "portraits/dunefolk/rover.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=axe\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}explorer.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=composite bow\n        [/filter_attack]\n        start_time=-250\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"{PATH_TEMP}explorer.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow-puny.ogg bow-puny-miss.ogg -225}\n    [/attack_anim]"
    ]
  },
  "Dune Falconer": {
    "id": "Dune Falconer",
    "image": "units/dunefolk/skirmisher/falconer.png",
    "profile": "portraits/dunefolk/falconer.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-250\n        falcon_start_time=-250\n        [if]\n            {DIVERSION_ANIM_FILTER}\n            [frame]\n                image=\"{PATH_TEMP}falconer-alone.png:300\"\n            [/frame]\n            [falcon_frame]\n                image=\"{PATH_TEMP}falcon-hover.png:300\"\n                auto_vflip=no\n                y=-45~-40:300\n            [/falcon_frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"{PATH_TEMP}falconer.png:300\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=falcon\n        [/filter_attack]\n        start_time=-150\n        missile_start_time=-150\n        direction=nw,n,ne\n        [if]\n            hits=yes\n            [missile_frame]\n                image=\"{PATH_TEMP}falcon-n.png:300,{PATH_TEMP}falcon-n.png~FL(vert):400\"\n                image_diagonal=\"{PATH_TEMP}falcon-e.png:300,{PATH_TEMP}falcon-e.png~FL(horiz):400\"\n                y=-43~0:150,0~-43:150,-43:400\n                offset=0~0.8:150,0.8~1.6:150,1.6~0:400\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}falconer-alone.png:700\"\n                sound=gryphon-shriek-1.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                image=\"{PATH_TEMP}falcon-n.png:300,{PATH_TEMP}falcon-n.png~FL(vert):400\"\n                image_diagonal=\"{PATH_TEMP}falcon-e.png:300,{PATH_TEMP}falcon-e.png~FL(horiz):400\"\n                y=-43~-56:150,-56:150,-56~-43:400\n                offset=0~0.8:150,0.8~1.6:150,1.6~0:400\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}falconer-alone.png:700\"\n                sound=bat-flapping.wav\n            [/frame]\n        [/else]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=falcon\n        [/filter_attack]\n        start_time=-150\n        missile_start_time=-150\n        direction=sw,s,se\n        [if]\n            hits=yes\n            [missile_frame]\n                image=\"{PATH_TEMP}falcon-n.png~FL(vert):300,{PATH_TEMP}falcon-n.png:400\"\n                image_diagonal=\"{PATH_TEMP}falcon-e.png:300,{PATH_TEMP}falcon-e.png~FL(horiz):400\"\n                y=-43~0:150,0~-43:150,-43:400\n                offset=0~0.8:150,0.8~1.6:150,1.6~0:400\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}falconer-alone.png:700\"\n                sound=gryphon-shriek-1.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                image=\"{PATH_TEMP}falcon-n.png~FL(vert):300,{PATH_TEMP}falcon-n.png:400\"\n                image_diagonal=\"{PATH_TEMP}falcon-e.png:300,{PATH_TEMP}falcon-e.png~FL(horiz):400\"\n                y=-43~-56:150,-56:150,-56~-43:400\n                offset=0~0.8:150,0.8~1.6:150,1.6~0:400\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}falconer-alone.png:700\"\n                sound=bat-flapping.wav\n            [/frame]\n        [/else]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        falcon_start_time=0\n        [if]\n            {DIVERSION_ANIM_FILTER}\n            [frame]\n                image=\"{PATH_TEMP}falconer-alone.png:1200\"\n            [/frame]\n            [falcon_frame]\n                image=\"{PATH_TEMP}falcon-hover[1,2,3,2].png:300\"\n                x=-0~5:300,5~-5:600,-5~0:300\n                y=-40~-45:600,-45~-40:600\n                auto_vflip=no\n            [/falcon_frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"{PATH_TEMP}falconer.png:200\"\n            [/frame]\n        [/else]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        falcon_start_time=0\n        [if]\n            {DIVERSION_ANIM_FILTER}\n            [frame]\n                image=\"{PATH_TEMP}falconer-alone.png:200\"\n            [/frame]\n            [falcon_frame]\n                image=\"{PATH_TEMP}falcon-hover[1,2,3,2].png:[50,50,50,50]\"\n                y=-40~-46:100,-46~-40:100\n                auto_vflip=no\n                offset=\"0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200\"\n            [/falcon_frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"{PATH_TEMP}falconer-move1.png:200\"\n            [/frame]\n        [/else]\n    [/movement_anim]"
    ]
  },
  "Dune Firetrooper": {
    "id": "Dune Firetrooper",
    "image": "units/dunefolk/burner/firetrooper.png",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}firetrooper.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav dagger-swish.wav -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=flamethrower\n        [/filter_attack]\n        start_time=-225\n        missile_start_time=-150\n        [if]\n            hits=yes\n            [missile_frame]\n                duration=150\n                image=\"projectiles/missile-fire-n.png\"\n                image_diagonal=\"projectiles/missile-fire-ne.png\"\n                offset=0~0.8\n            [/missile_frame]\n            {FIRE_BURST_SMALL}\n            [frame]\n                image=\"{PATH_TEMP}firetrooper.png:300\"\n                sound=bow-puny-fire.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                duration=150\n                image=\"projectiles/missile-fire-n.png\"\n                image_diagonal=\"projectiles/missile-fire-ne.png\"\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}firetrooper.png:300\"\n                sound=bow-puny-fire-miss.ogg\n            [/frame]\n        [/else]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=dagger\n            [/filter_attack]\n            start_time=-200\n            [frame]\n                image=\"{PATH_TEMP}firetrooper+female.png:300\"\n            [/frame]\n            {SOUND:HIT_AND_MISS dagger-swish.wav dagger-swish.wav -150}\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=flamethrower\n            [/filter_attack]\n            start_time=-225\n            missile_start_time=-150\n            [if]\n                hits=yes\n                [missile_frame]\n                    duration=150\n                    image=\"projectiles/missile-fire-n.png\"\n                    image_diagonal=\"projectiles/missile-fire-ne.png\"\n                    offset=0~0.8\n                [/missile_frame]\n                {FIRE_BURST_SMALL}\n                [frame]\n                    image=\"{PATH_TEMP}firetrooper+female.png:300\"\n                    sound=bow-puny-fire.ogg\n                [/frame]\n            [/if]\n            [else]\n                hits=no\n                [missile_frame]\n                    duration=150\n                    image=\"projectiles/missile-fire-n.png\"\n                    image_diagonal=\"projectiles/missile-fire-ne.png\"\n                [/missile_frame]\n                [frame]\n                    image=\"{PATH_TEMP}firetrooper+female.png:300\"\n                    sound=bow-puny-fire-miss.ogg\n                [/frame]\n            [/else]\n        [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        flame_start_time=0\n        glow_start_time=0\n\n        [if]\n            direction=n,ne,se\n            [frame]\n                image=\"{PATH_TEMP}firetrooper.png:480\"\n                auto_hflip=no\n                auto_vflip=no\n                primary=yes\n            [/frame]\n            [flame_frame]\n                image=\"{PATH_TEMP}firetrooper_flame[1~12].png:40*12\"\n                layer=45\n                auto_hflip=no\n                auto_vflip=no\n                primary=no\n            [/flame_frame]\n            [glow_frame]\n                image=\"{PATH_TEMP}firetrooper_glow.png:480\"\n                layer=46\n                auto_hflip=no\n                auto_vflip=no\n                primary=no\n            [/glow_frame]\n        [/if]\n        [else]\n            direction=s,sw,nw\n            [frame]\n                image=\"{PATH_TEMP}firetrooper.png~FL(horiz):480\"\n                auto_hflip=no\n                auto_vflip=no\n                primary=yes\n            [/frame]\n            [flame_frame]\n                image=\"{PATH_TEMP}firetrooper_flame[1~12].png~FL(horiz):40*12\"\n                layer=45\n                auto_hflip=no\n                auto_vflip=no\n                primary=no\n            [/flame_frame]\n            [glow_frame]\n                image=\"{PATH_TEMP}firetrooper_glow.png~FL(horiz):480\"\n                layer=46\n                auto_hflip=no\n                auto_vflip=no\n                primary=no\n            [/glow_frame]\n        [/else]\n    [/standing_anim]"
    ]
  },
  "Dune Harrier": {
    "id": "Dune Harrier",
    "image": "units/dunefolk/skirmisher/harrier.png",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"{PATH_TEMP}harrier.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=bolas\n        [/filter_attack]\n        start_time=-225\n        missile_start_time=-150\n        [if]\n            hits=yes\n            [missile_frame]\n                duration=150\n                image=\"projectiles/bolas-n.png\"\n                image_diagonal=\"projectiles/bolas-ne.png\"\n                offset=0~0.8\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}harrier.png:300\"\n                sound=sling.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                duration=150\n                image=\"projectiles/bolas-n.png\"\n                image_diagonal=\"projectiles/bolas-ne.png\"\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}harrier.png:300\"\n                sound=sling-miss.ogg\n            [/frame]\n        [/else]\n    [/attack_anim]"
    ]
  },
  "Dune Herbalist": {
    "id": "Dune Herbalist",
    "image": "units/dunefolk/herbalist/herbalist.png",
    "profile": "portraits/dunefolk/herbalist.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}herbalist.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Dune Horse Archer": {
    "id": "Dune Horse Archer",
    "image": "units/dunefolk/rider/horse-archer.png",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace\n        [/filter_attack]\n        start_time=-250\n        horse_sound_start_time=-250\n        [frame]\n            image=\"{PATH_TEMP}horse-archer.png:400\"\n        [/frame]\n        [horse_sound_frame]\n            sound=horse-canter.wav\n        [/horse_sound_frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=composite bow\n        [/filter_attack]\n        start_time=-250\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"{PATH_TEMP}horse-archer.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow-puny.ogg bow-puny-miss.ogg -225}\n    [/attack_anim]"
    ]
  },
  "Dune Luminary": {
    "id": "Dune Luminary",
    "image": "units/dunefolk/herbalist/luminary.png",
    "profile": "portraits/dunefolk/herbalist.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}luminary.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Dune Marauder": {
    "id": "Dune Marauder",
    "image": "units/dunefolk/rider/marauder.png",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=torch\n        [/filter_attack]\n        start_time=-250\n        horse_sound_start_time=-250\n        [frame]\n            image=\"{TORCH_STATIC_IMAGE}:400\"\n        [/frame]\n        [horse_sound_frame]\n            sound=horse-canter.wav\n        [/horse_sound_frame]\n        {SOUND:HIT_AND_MISS torch.ogg torch-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        start_time=-250\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"{PATH_TEMP}marauder.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow-puny.ogg bow-puny-miss.ogg -225}\n    [/attack_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=-0\n        [frame]\n            image=\"{TORCH_STATIC_IMAGE}:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Dune Paragon": {
    "id": "Dune Paragon",
    "image": "units/dunefolk/soldier/paragon.png",
    "level": "4",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}paragon.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=pommel strike\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}paragon.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Dune Raider": {
    "id": "Dune Raider",
    "image": "units/dunefolk/rider/raider.png",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=torch\n        [/filter_attack]\n        start_time=-250\n        horse_sound_start_time=-250\n        [frame]\n            image=\"{TORCH_STATIC_IMAGE}:400\"\n        [/frame]\n        [horse_sound_frame]\n            sound=horse-canter.wav\n        [/horse_sound_frame]\n        {SOUND:HIT_AND_MISS torch.ogg torch-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        start_time=-250\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"{PATH_TEMP}raider.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow-puny.ogg bow-puny-miss.ogg -225}\n    [/attack_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=-0\n        [frame]\n            image=\"{TORCH_STATIC_IMAGE}:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Dune Rider": {
    "id": "Dune Rider",
    "image": "units/dunefolk/rider/rider.png",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace\n        [/filter_attack]\n        start_time=-250\n        horse_sound_start_time=-250\n        [frame]\n            image=\"{PATH_TEMP}rider.png:400\"\n        [/frame]\n        [horse_sound_frame]\n            sound=horse-canter.wav\n        [/horse_sound_frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=composite bow\n        [/filter_attack]\n        start_time=-250\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"{PATH_TEMP}rider.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow-puny.ogg bow-puny-miss.ogg -225}\n    [/attack_anim]"
    ]
  },
  "Dune Rover": {
    "id": "Dune Rover",
    "image": "units/dunefolk/rover/rover.png",
    "profile": "portraits/dunefolk/rover.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=axe\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}rover.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=composite bow\n        [/filter_attack]\n        start_time=-250\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"{PATH_TEMP}rover.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow-puny.ogg bow-puny-miss.ogg -225}\n    [/attack_anim]"
    ]
  },
  "Dune Scorcher": {
    "id": "Dune Scorcher",
    "image": "units/dunefolk/burner/scorcher.png",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}scorcher.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav dagger-swish.wav -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=flamethrower\n        [/filter_attack]\n        start_time=-225\n        missile_start_time=-150\n        [if]\n            hits=yes\n            [missile_frame]\n                duration=150\n                image=\"projectiles/missile-fire-n.png\"\n                image_diagonal=\"projectiles/missile-fire-ne.png\"\n                offset=0~0.8\n            [/missile_frame]\n            {FIRE_BURST_SMALL}\n            [frame]\n                image=\"{PATH_TEMP}scorcher.png:300\"\n                sound=bow-puny-fire.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                duration=150\n                image=\"projectiles/missile-fire-n.png\"\n                image_diagonal=\"projectiles/missile-fire-ne.png\"\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}scorcher.png:300\"\n                sound=bow-puny-fire-miss.ogg\n            [/frame]\n        [/else]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=dagger\n            [/filter_attack]\n            start_time=-200\n            [frame]\n                image=\"{PATH_TEMP}scorcher+female.png:300\"\n            [/frame]\n            {SOUND:HIT_AND_MISS dagger-swish.wav dagger-swish.wav -150}\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=flamethrower\n            [/filter_attack]\n            start_time=-225\n            missile_start_time=-150\n            [if]\n                hits=yes\n                [missile_frame]\n                    duration=150\n                    image=\"projectiles/missile-fire-n.png\"\n                    image_diagonal=\"projectiles/missile-fire-ne.png\"\n                    offset=0~0.8\n                [/missile_frame]\n                {FIRE_BURST_SMALL}\n                [frame]\n                    image=\"{PATH_TEMP}scorcher+female.png:300\"\n                    sound=bow-puny-fire.ogg\n                [/frame]\n            [/if]\n            [else]\n                hits=no\n                [missile_frame]\n                    duration=150\n                    image=\"projectiles/missile-fire-n.png\"\n                    image_diagonal=\"projectiles/missile-fire-ne.png\"\n                [/missile_frame]\n                [frame]\n                    image=\"{PATH_TEMP}scorcher+female.png:300\"\n                    sound=bow-puny-fire-miss.ogg\n                [/frame]\n            [/else]\n        [/attack_anim]"
    ]
  },
  "Dune Skirmisher": {
    "id": "Dune Skirmisher",
    "image": "units/dunefolk/skirmisher/skirmisher.png",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        start_time=-250\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"{PATH_TEMP}skirmisher.png:300\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"{PATH_TEMP}skirmisher-ne.png:300\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sling\n        [/filter_attack]\n        start_time=-225\n        missile_start_time=-150\n        [if]\n            hits=yes\n            [missile_frame]\n                duration=150\n                image=\"projectiles/bolas-n.png\"\n                image_diagonal=\"projectiles/bolas-ne.png\"\n                offset=0~0.8\n            [/missile_frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                duration=150\n                image=\"projectiles/bolas-n.png\"\n                image_diagonal=\"projectiles/bolas-ne.png\"\n            [/missile_frame]\n        [/else]\n        {SOUND:HIT_AND_MISS sling.ogg sling-miss.ogg -100}\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"{PATH_TEMP}skirmisher.png:300\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"{PATH_TEMP}skirmisher-ne.png:300\"\n            [/frame]\n        [/else]\n    [/attack_anim]"
    ]
  },
  "Dune Sky Hunter": {
    "id": "Dune Sky Hunter",
    "image": "units/dunefolk/skirmisher/sky_hunter.png",
    "profile": "portraits/dunefolk/falconer.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-250\n        falcon_start_time=-250\n        [if]\n            {DIVERSION_ANIM_FILTER}\n            [frame]\n                image=\"{PATH_TEMP}sky_hunter-alone.png:300\"\n            [/frame]\n            [falcon_frame]\n                image=\"{PATH_TEMP}eagle-hover.png:300\"\n                auto_vflip=no\n                y=-45~-40:300\n            [/falcon_frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"{PATH_TEMP}sky_hunter.png:300\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=falcon\n        [/filter_attack]\n        start_time=-150\n        missile_start_time=-150\n        direction=nw,n,ne\n        [if]\n            hits=yes\n            [missile_frame]\n                image=\"{PATH_TEMP}eagle-n.png:300,{PATH_TEMP}eagle-n.png~FL(vert):400\"\n                image_diagonal=\"{PATH_TEMP}eagle-e.png:300,{PATH_TEMP}eagle-e.png~FL(horiz):400\"\n                y=-43~0:150,0~-43:150,-43:400\n                auto_vflip=no\n                offset=0~0.8:150,0.8~1.6:150,1.6~0:400\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}sky_hunter-alone.png:700\"\n                sound=gryphon-shriek-1.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                image=\"{PATH_TEMP}falcon-n.png:300,{PATH_TEMP}eagle-n.png~FL(vert):400\"\n                image_diagonal=\"{PATH_TEMP}falcon-e.png:300,{PATH_TEMP}eagle-e.png~FL(horiz):400\"\n                auto_vflip=no\n                y=-43~-56:150,-56:150,-56~-43:400\n                offset=0~0.8:150,0.8~1.6:150,1.6~0:400\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}sky_hunter-alone.png:700\"\n                sound=bat-flapping.wav\n            [/frame]\n        [/else]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=falcon\n        [/filter_attack]\n        start_time=-150\n        missile_start_time=-150\n        direction=sw,s,se\n        [if]\n            hits=yes\n            [missile_frame]\n                image=\"{PATH_TEMP}eagle-n.png~FL(vert):300,{PATH_TEMP}eagle-n.png:400\"\n                image_diagonal=\"{PATH_TEMP}eagle-e.png:300,{PATH_TEMP}eagle-e.png~FL(horiz):400\"\n                y=-43~0:150,0~-43:150,-43:400\n                auto_vflip=no\n                offset=0~0.8:150,0.8~1.6:150,1.6~0:400\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}sky_hunter-alone.png:700\"\n                sound=gryphon-shriek-1.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                image=\"{PATH_TEMP}falcon-n.png~FL(vert):300,{PATH_TEMP}eagle-n.png:400\"\n                image_diagonal=\"{PATH_TEMP}falcon-e.png:300,{PATH_TEMP}eagle-e.png~FL(horiz):400\"\n                auto_vflip=no\n                y=-43~-56:150,-56:150,-56~-43:400\n                offset=0~0.8:150,0.8~1.6:150,1.6~0:400\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}sky_hunter-alone.png:700\"\n                sound=bat-flapping.wav\n            [/frame]\n        [/else]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        falcon_start_time=0\n        [if]\n            {DIVERSION_ANIM_FILTER}\n            [frame]\n                image=\"{PATH_TEMP}sky_hunter-alone.png:1200\"\n            [/frame]\n            [falcon_frame]\n                image=\"{PATH_TEMP}eagle-hover[1,2,3,2].png:300\"\n                x=-0~5:300,5~-5:600,-5~0:300\n                y=-40~-45:600,-45~-40:600\n                auto_vflip=no\n            [/falcon_frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"{PATH_TEMP}sky_hunter.png:200\"\n            [/frame]\n        [/else]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        falcon_start_time=0\n        [if]\n            {DIVERSION_ANIM_FILTER}\n            [frame]\n                image=\"{PATH_TEMP}sky_hunter-alone.png:200\"\n            [/frame]\n            [falcon_frame]\n                image=\"{PATH_TEMP}eagle-hover[1,2,3,2].png:[50,50,50,50]\"\n                y=-40~-46:100,-46~-40:100\n                auto_vflip=no\n                offset=\"0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200\"\n            [/falcon_frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"{PATH_TEMP}sky_hunter-move1.png:200\"\n            [/frame]\n        [/else]\n    [/movement_anim]"
    ]
  },
  "Dune Soldier": {
    "id": "Dune Soldier",
    "image": "units/dunefolk/soldier/soldier.png",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=scimitar\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}soldier.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Dune Spearguard": {
    "id": "Dune Spearguard",
    "image": "units/dunefolk/soldier/spearguard.png",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}spearguard.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=shield bash\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}spearguard.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Dune Spearmaster": {
    "id": "Dune Spearmaster",
    "image": "units/dunefolk/soldier/spearmaster.png",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}spearmaster.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=shield bash\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}spearmaster.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Dune Strider": {
    "id": "Dune Strider",
    "image": "units/dunefolk/skirmisher/strider.png",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"{PATH_TEMP}strider.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=bolas\n        [/filter_attack]\n        start_time=-225\n        missile_start_time=-150\n        [if]\n            hits=yes\n            [missile_frame]\n                duration=150\n                image=\"projectiles/bolas-n.png\"\n                image_diagonal=\"projectiles/bolas-ne.png\"\n                offset=0~0.8\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}strider.png:300\"\n                sound=sling.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                duration=150\n                image=\"projectiles/bolas-n.png\"\n                image_diagonal=\"projectiles/bolas-ne.png\"\n            [/missile_frame]\n            [frame]\n                image=\"{PATH_TEMP}strider.png:300\"\n                sound=sling-miss.ogg\n            [/frame]\n        [/else]\n    [/attack_anim]"
    ]
  },
  "Dune Sunderer": {
    "id": "Dune Sunderer",
    "image": "units/dunefolk/rider/sunderer.png",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace\n        [/filter_attack]\n        start_time=-250\n        horse_sound_start_time=-250\n        [frame]\n            image=\"{PATH_TEMP}sunderer.png:400\"\n        [/frame]\n        [horse_sound_frame]\n            sound=horse-canter.wav\n        [/horse_sound_frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=composite bow\n        [/filter_attack]\n        start_time=-250\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"{PATH_TEMP}sunderer.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow-puny.ogg bow-puny-miss.ogg -225}\n    [/attack_anim]"
    ]
  },
  "Dune Swordsman": {
    "id": "Dune Swordsman",
    "image": "units/dunefolk/soldier/swordsman.png",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=scimitar_balance\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}swordsman.png:500\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=scimitar_force\n        [/filter_attack]\n        start_time=-300\n        [frame]\n            image=\"{PATH_TEMP}swordsman.png:500\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Dune Warmaster": {
    "id": "Dune Warmaster",
    "image": "units/dunefolk/soldier/warmaster.png",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=scimitar\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}warmaster.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Dune Wayfarer": {
    "id": "Dune Wayfarer",
    "image": "units/dunefolk/rover/wayfarer.png",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=axe\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"{PATH_TEMP}wayfarer.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=composite bow\n        [/filter_attack]\n        start_time=-250\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"{PATH_TEMP}wayfarer.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow-puny.ogg bow-puny-miss.ogg -225}\n    [/attack_anim]"
    ]
  },
  "Dune Windbolt": {
    "id": "Dune Windbolt",
    "image": "units/dunefolk/rider/windbolt.png",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace\n        [/filter_attack]\n        start_time=-250\n        horse_sound_start_time=-250\n        [frame]\n            image=\"{PATH_TEMP}windbolt.png:400\"\n        [/frame]\n        [horse_sound_frame]\n            sound=horse-canter.wav\n        [/horse_sound_frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=composite bow\n        [/filter_attack]\n        start_time=-250\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"{PATH_TEMP}windbolt.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow-puny.ogg bow-puny-miss.ogg -225}\n    [/attack_anim]"
    ]
  },
  "Wyvern Rider": {
    "id": "Wyvern Rider",
    "image": "units/dunefolk/wyvern-rider.png",
    "level": "4",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n\n        start_time=-200\n\n        [frame]\n            image=\"units/dunefolk/wyvern-rider.png:300\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS bite.ogg bite.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=javelin\n        [/filter_attack]\n\n        start_time=-200\n\n        [frame]\n            image=\"units/dunefolk/wyvern-rider.png:300\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Dwarvish Arcanister": {
    "id": "Dwarvish Arcanister",
    "image": "units/dwarves/arcanister.png",
    "profile": "portraits/dwarves/runemaster.webp",
    "level": "4",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=hammer\n        [/filter_attack]\n        offset=0.0~0.3,0.3~0.5,0.5~0.6,0.6~0.5,0.5~0.3,0.3~0.0\n        start_time=-350\n        [frame]\n            image=units/dwarves/arcanister.png:250\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n        [frame]\n            image=units/dwarves/arcanister.png:400\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Dwarvish Berserker": {
    "id": "Dwarvish Berserker",
    "image": "units/dwarves/berserker/berserker.png",
    "profile": "portraits/dwarves/ulfserker.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=berserker frenzy\n        [/filter_attack]\n        [if]\n            [filter_second_attack]\n            [/filter_second_attack]\n            value_second=1\n            ### all units with any melee attack (because the dwarf's attack is melee) will pass the above filter, and execute this block instead of the following block\n\n            start_time=-240\n            offset=0.0~-0.15:20,-0.15~0.1:30,0.1~0.5:190,0.5~0.6:30,0.6~0.6:30,0.6~0.15:100,0.15~0.0:30\n        [/if]\n\n        [else]\n            ### when a unit with no melee attack is attacked by a berzerk unit, they are highly likely to die.  We play an easter egg when this happens - the zerk looks at the victim for a moment, and then lets out a diabolical laugh.\n\n            start_time=-3640\n            offset=0.0~0.0:3400,0.0~-0.15:20,-0.15~0.1:30,0.1~0.5:190,0.5~0.6:30,0.6~0.6:30,0.6~0.15:100,0.15~0.0:30\n\n            value_second=1\n            [frame]\n                image=\"units/dwarves/berserker/berserker.png:200\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/berserker/berserker-laugh-1.png:400\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/berserker/berserker-laugh-[2,1,2,1,2,1,2,1,2,1,2,1,2,1].png:200\"\n                sound=dwarf-laugh.wav\n            [/frame]\n        [/else]\n        [else]\n            start_time=-241\n            [frame]\n                image=\"units/dwarves/berserker/berserker.png:1\"\n            [/frame]\n        [/else]\n\n        [frame]\n            image=\"units/dwarves/berserker/berserker-attack-[1~8,1].png:[40,50*4,60,40,30*2]\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/berserker/berserker.png:30\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        {WOUNDED_UNIT ()}\n        start_time=0\n        [frame]\n            image=\"units/dwarves/berserker/berserker-bob[1~6].png:200\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/dwarves/berserker/berserker.png:200\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Dwarvish Dragonguard": {
    "id": "Dwarvish Dragonguard",
    "image": "units/dwarves/dragonguard/dragonguard.png",
    "profile": "portraits/dwarves/dragonguard.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=dragonstaff\n        [/filter_attack]\n        start_time=-1250\n        halo_start_time=-250\n\n        [if]\n            {MISSILE_FRAME_DG_SECOND_MUZZLE_FLARE_HIT_SOUTH 0 -4}\n            direction=s\n            hits=yes\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-s-ranged[1~22].png:[100*7,300,80*3,90,100,120*3,100*6]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-se-ranged23.png:100\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard.png:200\"\n            [/frame]\n\n            [halo_frame]\n                halo=\"halo/dragonguard/dg-muzzle-flash-s-[1~17].png:[80*3,90,100,120*3,100*9]\"\n                auto_vflip=no\n            [/halo_frame]\n        [/if]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_MISS 3 24}\n            direction=s\n            hits=no\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-s-ranged[1~8,8,6~2,22].png:[100*7,300,100*7]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-se-ranged23.png:100\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard.png:20\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_DG_SECOND_MUZZLE_FLARE_HIT_DIAG_NORTH -8 10}\n            direction=ne,nw\n            hits=yes\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-ne-ranged[1~23].png:[100*7,300,80*3,90,100,120*3,100*7]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-ne.png:200\"\n            [/frame]\n\n            [halo_frame]\n                halo=\"halo/dragonguard/dg-muzzle-flash-ne-[1~17].png:[80*3,90,100,120*3,100*9]\"\n                auto_vflip=no\n            [/halo_frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_MISS 19 -2}\n            direction=ne,nw\n            hits=no\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-ne-ranged[1~8,8,6~2,22,23].png:[100*7,300,100*8]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-ne.png:20\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_DG_SECOND_MUZZLE_FLARE_HIT_NORTH -1 16}\n            direction=n\n            hits=yes\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-n-ranged[1~22].png:[100*7,300,80*3,90,100,120*3,100*6]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-ne-ranged23.png:100\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-ne.png:200\"\n            [/frame]\n\n            [halo_frame]\n                halo=\"halo/dragonguard/dg-muzzle-flash-n-[1~17].png:[80*3,90,100,120*3,100*9]\"\n                auto_vflip=no\n            [/halo_frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_MISS -7 -6}\n            direction=n\n            hits=no\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-n-ranged[1~8,8,6~2,22].png:[100*7,300,100*7]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-ne-ranged23.png:100\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-ne.png:20\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_DG_SECOND_MUZZLE_FLARE_HIT_DIAG_SOUTH 0 8}\n            direction=se,sw\n            hits=yes\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-se-ranged[1~23].png:[100*7,300,80*3,90,100,120*3,100*7]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard.png:200\"\n            [/frame]\n\n            [halo_frame]\n                halo=\"halo/dragonguard/dg-muzzle-flash-se-[1~17].png:[80*3,90,100,120*3,100*9]\"\n                auto_vflip=no\n            [/halo_frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_MISS 18 17}\n            direction=se,sw\n            hits=no\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-se-ranged[1~8,8,6~2,22,23].png:[100*7,300,100*8]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard.png:20\"\n            [/frame]\n        [/else]\n\n        {SOUND:HIT_AND_MISS dragonstick.ogg thunderstick-miss.ogg -250}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-550\n        offset=0.0~0.0:200,0.0~0.5:270,0.5~0.5:180,0.5~0.0:200\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-se-blade[1~9,1].png:[50,100*8,50]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/dwarves/dragonguard/dragonguard-ne-blade[1~9,1].png:[50,100*8,50]\"\n            [/frame]\n        [/else]\n\n        {SOUND:HIT_AND_MISS knife.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Dwarvish Explorer": {
    "id": "Dwarvish Explorer",
    "image": "units/dwarves/explorer.png",
    "profile": "portraits/dwarves/explorer.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            range=ranged\n            name=axe\n        [/filter_attack]\n        {MISSILE_FRAME_HATCHET}\n        start_time=-300\n        [frame]\n            image=\"units/dwarves/explorer-ranged-[1~3].png:[200*2,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS hatchet.wav hatchet-miss.wav -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            range=melee\n            name=battle axe\n        [/filter_attack]\n        start_time=-260\n        offset=0.0~0.1:210,0.1~0.6:150,0.6~0.0:150\n        [frame]\n            image=\"units/dwarves/explorer-melee-[1~6].png:[80*2,50*2,100*2]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ]
  },
  "Dwarvish Fighter": {
    "id": "Dwarvish Fighter",
    "image": "units/dwarves/fighter.png",
    "profile": "portraits/dwarves/fighter.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=hammer\n        [/filter_attack]\n        start_time=-350\n        offset=0.0~-0.05,-0.05~0.1,0.1~0.55,0.55~0.55,0.5~0.0\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/dwarves/fighter-se-hammer.png:40\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/fighter-se-hammer[1~7].png:100,units/dwarves/fighter-se-hammer.png:100\"\n            [/frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"units/dwarves/fighter-ne-hammer.png:40\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/fighter-ne-hammer[1~7].png:100,units/dwarves/fighter-ne-hammer.png:100\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=axe\n        [/filter_attack]\n        start_time=-350\n        #    offset=0.0~-0.15:30,-0.15~0.1:60,0.1~0.5:190,0.5~0.6:30,0.6~0.6:40,0.6~0.15:150,0.15~0.0:40\n        offset=0.0~-0.15:40,-0.15~0.4:240,0.4~0.4:120,0.4~0.0:200\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/dwarves/fighter-se-axe[1~9].png:[40,60*6,80*2]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/fighter.png:40\"\n            [/frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"units/dwarves/fighter-ne-axe[1~9].png:[40,60*6,80*2]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/fighter-ne.png:40\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=units/dwarves/fighter.png:200\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=units/dwarves/fighter-ne.png:200\n            [/frame]\n        [/else]\n    [/standing_anim]"
    ]
  },
  "Dwarvish Guardsman": {
    "id": "Dwarvish Guardsman",
    "image": "units/dwarves/guard.png",
    "profile": "portraits/dwarves/guard.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=javelin\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n        start_time=-250\n        [frame]\n            image=\"units/dwarves/guard-defend-1.png:100\"\n            sound={SOUND_LIST:THROW}\n        [/frame]\n        {SOUND:HIT spear.ogg -150}\n        [frame]\n            image=\"units/dwarves/guard-attack.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/guard.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        start_time=-300\n        [frame]\n            image=\"units/dwarves/guard-attack-[1~7,1].png:[100*2,50*3,100*3]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -50}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        {WOUNDED_UNIT ()}\n        [frame]\n            image=\"units/dwarves/guard.png:400,units/dwarves/guard-bob-[1~3,2,1].png:[150*2,300,100*2]\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/guard.png:400,units/dwarves/guard-bob-[1~3,2,1].png:[150*2,300,100*2]\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/guard.png:400,units/dwarves/guard-bob-[1~5].png:[150*2,300,100*2]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/dwarves/guard.png:200\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Dwarvish Lord": {
    "id": "Dwarvish Lord",
    "image": "units/dwarves/lord.png",
    "profile": "portraits/dwarves/lord.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=hatchet\n        [/filter_attack]\n        start_time=-550\n        {MISSILE_FRAME_HATCHET}\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/dwarves/lord-se-ranged[1~7].png:100\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/dwarves/lord-ne-ranged[1~7].png:100\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS hatchet.wav hatchet-miss.wav -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=hammer\n        [/filter_attack]\n        start_time=-550\n        offset=0.0~-0.05,-0.05~0.1,0.1~0.55,0.55~0.55,0.5~0.0\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/dwarves/lord-se-hammer.png:40\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/lord-se-hammer[1~7].png:100,units/dwarves/lord-se-hammer.png:100\"\n            [/frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"units/dwarves/lord-ne-hammer.png:40\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/lord-ne-hammer[1~7].png:100,units/dwarves/lord-ne-hammer.png:100\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=battle axe\n        [/filter_attack]\n        start_time=-350\n        #    offset=0.0~-0.15:30,-0.15~0.1:60,0.1~0.5:190,0.5~0.6:30,0.6~0.6:40,0.6~0.15:150,0.15~0.0:40\n        offset=0.0~-0.15:40,-0.15~0.4:240,0.4~0.4:120,0.4~0.0:200\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/dwarves/lord-se-axe[1~9].png:[40,60*6,80*2]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/lord.png:40\"\n            [/frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"units/dwarves/lord-ne-axe[1~9].png:[40,60*6,80*2]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/lord-ne.png:40\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ]
  },
  "Dwarvish Miner": {
    "id": "Dwarvish Miner",
    "image": "units/dwarves/miner.png",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=pick\n        [/filter_attack]\n        start_time=-350\n        offset=0.0~0.3,0.3~0.5,0.5~0.6,0.6~0.5,0.5~0.3,0.3~0.0\n        [frame]\n            image=units/dwarves/miner-attack-[1~6].png:100\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [if]\n            [filter]\n                status=has_coal,has_gold\n            [/filter]\n            [frame]\n                image=units/dwarves/miner-laden.png:1000\n            [/frame]\n        [/if]\n        [else]\n            [frame]\n                image=units/dwarves/miner.png:1000\n            [/frame]\n        [/else]\n    [/standing_anim]"
    ]
  },
  "Dwarvish Pathfinder": {
    "id": "Dwarvish Pathfinder",
    "image": "units/dwarves/pathfinder.png",
    "profile": "portraits/dwarves/scout.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            range=ranged\n            name=axe\n        [/filter_attack]\n        {MISSILE_FRAME_HATCHET}\n        start_time=-300\n        [frame]\n            image=\"units/dwarves/pathfinder-ranged-[1~3].png:[200*2,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS hatchet.wav hatchet-miss.wav -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            range=melee\n            name=axe\n        [/filter_attack]\n        start_time=-340\n        offset=0.0~0.1:290,0.1~0.6:150,0.6~0.0:150\n        [frame]\n            image=\"units/dwarves/pathfinder-melee.png:80\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/pathfinder-melee-[1~6].png:[80*2,50*2,100*2]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ]
  },
  "Dwarvish Runemaster": {
    "id": "Dwarvish Runemaster",
    "image": "units/dwarves/runemaster.png",
    "profile": "portraits/dwarves/runemaster.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=hammer\n        [/filter_attack]\n        offset=0.0~0.3,0.3~0.5,0.5~0.6,0.6~0.5,0.5~0.3,0.3~0.0\n        start_time=-350\n        [frame]\n            image=units/dwarves/runemaster.png:250\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n        [frame]\n            image=units/dwarves/runemaster.png:400\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Dwarvish Runesmith": {
    "id": "Dwarvish Runesmith",
    "image": "units/dwarves/runesmith.png",
    "profile": "portraits/dwarves/runemaster.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=hammer\n        [/filter_attack]\n        start_time=-400\n        offset=0.0~-0.15,-0.15~0.1,0.1~0.5,0.5~0.6,0.6~0.6,0.6~0.15,0.15~0.0\n        [frame]\n            image=\"units/dwarves/runesmith-attack-se-[1~10].png:70\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        {WOUNDED_UNIT ()}\n        start_time=0\n        [frame]\n            image=\"units/dwarves/runesmith-bob-[1~6].png:[150*3,200,150*2]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/dwarves/runesmith.png:150\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Dwarvish Scout": {
    "id": "Dwarvish Scout",
    "image": "units/dwarves/scout.png",
    "profile": "portraits/dwarves/scout.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            range=ranged\n            name=axe\n        [/filter_attack]\n        {MISSILE_FRAME_HATCHET}\n        start_time=-300\n        [frame]\n            image=\"units/dwarves/scout-ranged-[1~3].png:[200*2,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS hatchet.wav hatchet-miss.wav -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            range=melee\n            name=axe\n        [/filter_attack]\n        start_time=-260\n        offset=0.0~0.6:260,0.6~0.6:100,0.6~0.0:150\n        [frame]\n            image=\"units/dwarves/scout-melee-[1~8].png:[80*2,50*4,100*2]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ]
  },
  "Dwarvish Sentinel": {
    "id": "Dwarvish Sentinel",
    "image": "units/dwarves/sentinel.png",
    "profile": "portraits/dwarves/sentinel.webp~CROP(0,100,400,400)",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=javelin\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n        start_time=-250\n        [frame]\n            image=\"units/dwarves/sentinel-defend-1.png:100\"\n            sound={SOUND_LIST:THROW}\n        [/frame]\n        {SOUND:HIT spear.ogg -150}\n        [frame]\n            image=\"units/dwarves/sentinel-attack.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/sentinel.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/dwarves/sentinel.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/sentinel-defend-1.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n        [frame]\n            image=\"units/dwarves/sentinel-attack.png:150\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/sentinel-defend-1.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/sentinel.png:75\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        {WOUNDED_UNIT ()}\n        start_time=0\n        [frame]\n            image=\"units/dwarves/sentinel.png:400,units/dwarves/sentinel-bob-[1~3,2,1].png:[150*2,300,100*2]\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/sentinel.png:400,units/dwarves/sentinel-bob-[1~3,2,1].png:[150*2,300,100*2]\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/sentinel.png:400,units/dwarves/sentinel-bob-[1~5].png:[150*2,300,100*2]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/dwarves/sentinel.png:200\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Dwarvish Stalwart": {
    "id": "Dwarvish Stalwart",
    "image": "units/dwarves/stalwart.png",
    "profile": "portraits/dwarves/sentinel.webp~CROP(0,100,400,400)",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=javelin\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n        start_time=-250\n        [frame]\n            image=\"units/dwarves/stalwart-defend-1.png:100\"\n            sound={SOUND_LIST:THROW}\n        [/frame]\n        {SOUND:HIT spear.ogg -150}\n        [frame]\n            image=\"units/dwarves/stalwart-attack.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/stalwart.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/dwarves/stalwart.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/stalwart-defend-1.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n        [frame]\n            image=\"units/dwarves/stalwart-attack.png:150\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/stalwart-defend-1.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/stalwart.png:75\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        {WOUNDED_UNIT ()}\n        start_time=0\n        [frame]\n            image=\"units/dwarves/stalwart.png:400,units/dwarves/stalwart-bob-[1~3,2,1].png:[150*2,300,100*2]\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/stalwart.png:400,units/dwarves/stalwart-bob-[1~3,2,1].png:[150*2,300,100*2]\"\n        [/frame]\n        [frame]\n            image=\"units/dwarves/stalwart.png:400,units/dwarves/stalwart-bob-[1~5].png:[150*2,300,100*2]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/dwarves/stalwart.png:200\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Dwarvish Steelclad": {
    "id": "Dwarvish Steelclad",
    "image": "units/dwarves/steelclad.png",
    "profile": "portraits/dwarves/fighter.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=hammer\n        [/filter_attack]\n        start_time=-350\n        offset=0.0~-0.05,-0.05~0.1,0.1~0.55,0.55~0.55,0.5~0.0\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/dwarves/steelclad-se-hammer.png:40\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/steelclad-se-hammer[1~7].png:100,units/dwarves/steelclad-se-hammer.png:100\"\n            [/frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"units/dwarves/steelclad-ne-hammer.png:40\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/steelclad-ne-hammer[1~7].png:100,units/dwarves/steelclad-ne-hammer.png:100\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=battle axe\n        [/filter_attack]\n        start_time=-350\n        #    offset=0.0~-0.15:30,-0.15~0.1:60,0.1~0.5:190,0.5~0.6:30,0.6~0.6:40,0.6~0.15:150,0.15~0.0:40\n        offset=0.0~-0.15:40,-0.15~0.4:240,0.4~0.4:120,0.4~0.0:200\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/dwarves/steelclad-se-axe[1~9].png:[40,60*6,80*2]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/steelclad.png:40\"\n            [/frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"units/dwarves/steelclad-ne-axe[1~9].png:[40,60*6,80*2]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/steelclad-ne.png:40\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ]
  },
  "Dwarvish Thunderer": {
    "id": "Dwarvish Thunderer",
    "image": "units/dwarves/thunderer/thunderer.png",
    "profile": "portraits/dwarves/thunderer.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=thunderstick\n        [/filter_attack]\n        start_time=-750\n\n        [if]\n            {MISSILE_FRAME_MUZZLE_FLARE_HIT_SOUTH -6 -5}\n            direction=s\n            hits=yes\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer-s-ranged[1~9].png:[100*3,200,140*2,100*3]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer.png:280\"\n            [/frame]\n        [/if]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_MISS -4 6}\n            direction=s\n            hits=no\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer-s-ranged[1~4,4,2,1].png:[100*3,200,100*3]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer.png:20\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_HIT_DIAG_NORTH -3 20}\n            direction=ne,nw\n            hits=yes\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer-ne-ranged[1~9].png:[100*3,200,140*2,100*3]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer-ne.png:280\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_MISS 5 0}\n            direction=ne,nw\n            hits=no\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer-ne-ranged[1~4,4,2,1].png:[100*3,200,100*3]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer-ne.png:20\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_HIT_NORTH 4 21}\n            direction=n\n            hits=yes\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer-n-ranged[1~9].png:[100*3,200,140*2,100*3]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer-ne.png:280\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_MISS 3 -2}\n            direction=n\n            hits=no\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer-n-ranged[1~4,4,2,1].png:[100*3,200,100*3]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer-ne.png:20\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_HIT_DIAG_SOUTH -10 10}\n            direction=se,sw\n            hits=yes\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer-se-ranged[1~9].png:[100*3,200,140*2,100*3]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer.png:280\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_MISS 4 11}\n            direction=se,sw\n            hits=no\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer-se-ranged[1~4,4,2,1].png:[100*3,200,100*3]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer.png:20\"\n            [/frame]\n        [/else]\n\n        {SOUND:HIT_AND_MISS thunderstick.ogg thunderstick-miss.ogg -250}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-550\n        offset=0.0~0.0:200,0.0~0.5:270,0.5~0.5:180,0.5~0.0:200\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer-se-blade[1~9,1].png:[50,100*8,50]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/dwarves/thunderer/thunderer-ne-blade[1~9,1].png:[50,100*8,50]\"\n            [/frame]\n        [/else]\n\n        {SOUND:HIT_AND_MISS knife.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=units/dwarves/thunderer/thunderer.png:200\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=units/dwarves/thunderer/thunderer-ne.png:200\n            [/frame]\n        [/else]\n    [/standing_anim]"
    ]
  },
  "Dwarvish Thunderguard": {
    "id": "Dwarvish Thunderguard",
    "image": "units/dwarves/thunderguard/thunderguard.png",
    "profile": "portraits/dwarves/thunderer.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=thunderstick\n        [/filter_attack]\n        start_time=-750\n\n        [if]\n            {MISSILE_FRAME_MUZZLE_FLARE_HIT_SOUTH 2 1}\n            direction=s\n            hits=yes\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard-s-ranged[1~12].png:[100*3,200,100,70,150*2,100*4]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard.png:10\"\n            [/frame]\n        [/if]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_MISS 4 7}\n            direction=s\n            hits=no\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard-s-ranged[1~4,4,2,1].png:[100*3,200,100*3]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard.png:10\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_HIT_DIAG_NORTH -1 16}\n            direction=ne,nw\n            hits=yes\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard-ne-ranged[1~12].png:[100*3,200,100,70,150*2,100*4]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard-ne.png:10\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_MISS 8 -1}\n            direction=ne,nw\n            hits=no\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard-ne-ranged[1~4,4,2,1].png:[100*3,200,100*3]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard-ne.png:10\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_HIT_NORTH -10 19}\n            direction=n\n            hits=yes\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard-n-ranged[1~12].png:[100*3,200,100,70,150*2,100*4]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard-ne.png:10\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_MISS -9 -4}\n            direction=n\n            hits=no\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard-n-ranged[1~4,4,2,1].png:[100*3,200,100*3]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard-ne.png:10\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_HIT_DIAG_SOUTH -3 7}\n            direction=se,sw\n            hits=yes\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard-se-ranged[1~12].png:[100*3,200,100,70,150*2,100*4]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard.png:10\"\n            [/frame]\n        [/else]\n        [else]\n            {MISSILE_FRAME_MUZZLE_FLARE_MISS 11 8}\n            direction=se,sw\n            hits=no\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard-se-ranged[1~4,4,2,1].png:[100*3,200,100*3]\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard.png:10\"\n            [/frame]\n        [/else]\n\n        {SOUND:HIT_AND_MISS thunderstick.ogg thunderstick-miss.ogg -250}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-550\n        offset=0.0~0.0:200,0.0~0.5:270,0.5~0.5:180,0.5~0.0:200\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard-se-blade[1~9,1].png:[50,100*8,50]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/dwarves/thunderguard/thunderguard-ne-blade[1~9,1].png:[50,100*8,50]\"\n            [/frame]\n        [/else]\n\n        {SOUND:HIT_AND_MISS knife.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Dwarvish Ulfserker": {
    "id": "Dwarvish Ulfserker",
    "image": "units/dwarves/ulfserker.png",
    "profile": "portraits/dwarves/ulfserker.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=berserker frenzy\n        [/filter_attack]\n\n        [if]\n            [filter_second_attack]\n            [/filter_second_attack]\n            value_second=1\n            ### all units with any melee attack (because the dwarf's attack is melee) will pass the above filter, and execute this block instead of the following block\n\n            start_time=-240\n            offset=0.0~-0.15:20,-0.15~0.1:30,0.1~0.5:190,0.5~0.6:30,0.6~0.6:30,0.6~0.15:100,0.15~0.0:30\n        [/if]\n        [else]\n            ### when a unit with no melee attack is attacked by a berzerk unit, they are highly likely to die.  We play an easter egg when this happens - the zerk looks at the victim for a moment, and then lets out a diabolical laugh.\n\n            start_time=-3640\n            offset=0.0~0.0:3400,0.0~-0.15:20,-0.15~0.1:30,0.1~0.5:190,0.5~0.6:30,0.6~0.6:30,0.6~0.15:100,0.15~0.0:30\n\n            value_second=1\n            [frame]\n                image=\"units/dwarves/ulfserker.png:200\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/ulfserker-laugh-1.png:400\"\n            [/frame]\n            [frame]\n                image=\"units/dwarves/ulfserker-laugh-[2,1,2,1,2,1,2,1,2,1,2,1,2,1].png:200\"\n                sound=dwarf-laugh.wav\n            [/frame]\n        [/else]\n        [else]\n            start_time=-241\n            [frame]\n                image=\"units/dwarves/ulfserker.png:1\"\n            [/frame]\n        [/else]\n\n        [frame]\n            image=\"units/dwarves/ulfserker-attack-[1~8,1].png:[40,50*4,60,40,30*2]\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        {WOUNDED_UNIT ()}\n        [frame]\n            image=\"units/dwarves/ulfserker-bob-[1~6].png:200\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/dwarves/ulfserker.png:200\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Elvish Archer": {
    "id": "Elvish Archer",
    "image": "units/elves-wood/archer.png",
    "profile": "portraits/elves/archer.webp~CROP(0,40,360,360)",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-445\n        [frame]\n            image=\"units/elves-wood/archer-bow.png:65\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}\n        [frame]\n            image=\"units/elves-wood/archer-bow-attack[1~4].png:[75*2,100,130]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/archer-bow.png:65\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/elves-wood/archer-sword.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/archer-sword-[1~4].png:[100,150,50*2]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -75}\n        [frame]\n            image=\"units/elves-wood/archer-sword.png:25\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=bow\n            [/filter_attack]\n            [frame]\n                image=\"units/elves-wood/archer+female-bow.png:65\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/archer+female-bow-attack[1~4].png:[75*2,100,130]\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/archer+female-bow.png:65\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=sword\n            [/filter_attack]\n            [frame]\n                image=\"units/elves-wood/archer+female-sword.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/archer+female-sword-[1~4].png:[100,150,50*2]\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/archer+female-sword.png:25\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Elvish Avenger": {
    "id": "Elvish Avenger",
    "image": "units/elves-wood/avenger.png",
    "profile": "portraits/elves/ranger.webp~CROP(20,20,400,400)",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-445\n        [frame]\n            image=\"units/elves-wood/avenger-bow.png:65\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}\n        [frame]\n            image=\"units/elves-wood/avenger-bow-attack[1~4].png:[75*2,100,130]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/avenger-bow.png:65\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/elves-wood/avenger-sword.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/avenger-sword-[1~3].png:[100,150,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -75}\n        [frame]\n            image=\"units/elves-wood/avenger-sword.png:25\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=bow\n            [/filter_attack]\n            [frame]\n                image=\"units/elves-wood/avenger+female-bow.png:65\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/avenger+female-bow-attack[1~4].png:[75*2,100,130]\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/avenger+female-bow.png:75\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=sword\n            [/filter_attack]\n            [frame]\n                image=\"units/elves-wood/avenger+female-sword.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/avenger+female-sword-[1~3].png:[100,150,100]\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/avenger+female-sword.png:25\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Elvish Captain": {
    "id": "Elvish Captain",
    "image": "units/elves-wood/captain.png",
    "profile": "portraits/elves/captain.webp~CROP(8,60,370,380)",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-445\n        [frame]\n            image=\"units/elves-wood/captain-bow.png:65\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}\n        [frame]\n            image=\"units/elves-wood/captain-bow-attack[1~4].png:[75*2,100,130]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/captain-bow.png:65\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/elves-wood/captain.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/captain-melee-[2,1,2].png:[75,200,75]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/elves-wood/captain.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Elvish Champion": {
    "id": "Elvish Champion",
    "image": "units/elves-wood/champion.png",
    "profile": "portraits/elves/hero.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-445\n        [frame]\n            image=\"units/elves-wood/champion-bow.png:65\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}\n        [frame]\n            image=\"units/elves-wood/champion-bow-attack[1~4].png:[75*2,100,130]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/champion-bow.png:65\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/elves-wood/champion.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/champion-attack-[1~6].png:[50*2,150,50*2,25]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -75}\n    [/attack_anim]"
    ]
  },
  "Elvish Druid": {
    "id": "Elvish Druid",
    "image": "units/elves-wood/druid.png",
    "profile": "portraits/elves/druid.webp~CROP(18,48,362,362)",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=thorns\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            duration=200\n            image=\"projectiles/thorns.png\"\n            image_diagonal=\"projectiles/thorns-ne.png\"\n        [/missile_frame]\n\n        start_time=-300\n        [frame]\n            image=\"units/elves-wood/druid-magic-[1~4,4~1].png:75\"\n            halo=\"halo/elven/nature-halo[1~8].png\"\n            halo_x,halo_y=0,-12\n        [/frame]\n        {SOUND:HIT_AND_MISS magic-thorns-[1,2].ogg magic-thorns-miss-[1,2].ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=ensnare\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            offset=1.0\n            duration=200\n            image=\"projectiles/entangle.png\"\n            image_diagonal=\"projectiles/entangle.png\"\n        [/missile_frame]\n        start_time=-300\n        [frame]\n            image=\"units/elves-wood/druid-magic-[1~4,4~1].png:75\"\n            halo=\"halo/elven/nature-halo[1~8].png\"\n            halo_x,halo_y=0,-12\n        [/frame]\n        attack_sound_start_time=-75\n        [attack_sound_frame]\n            sound=entangle.wav\n        [/attack_sound_frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        start_time=-175\n        [frame]\n            image=\"units/elves-wood/druid.png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/elves-wood/druid-attack.png:200\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/druid.png:75\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Elvish Enchantress": {
    "id": "Elvish Enchantress",
    "image": "units/elves-wood/enchantress.png",
    "profile": "portraits/elves/sorceress.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=faerie fire\n        [/filter_attack]\n        start_time=-450\n        {MISSILE_FRAME_FAERIE_FIRE}\n\n        {SOUND:HIT_AND_MISS magic-faeriefire.ogg magic-faeriefire-miss.ogg -450}\n        [frame]\n            image=\"units/elves-wood/enchantress-magic-[1,2*5,1].png:75\"\n            halo=halo/elven/faerie-fire-halo[1~7].png\n            halo_x,halo_y=0,-28\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=entangle\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            offset=1.0\n            duration=250\n            image=\"projectiles/entangle.png\"\n            image_diagonal=\"projectiles/entangle.png\"\n        [/missile_frame]\n        start_time=-450\n        [frame]\n            image=\"units/elves-wood/enchantress-magic-[1,2*6,1].png:75\"\n            halo=halo/elven/nature-halo[1~8].png\n            halo_x,halo_y=0,-28\n        [/frame]\n        attack_sound_start_time=-75\n        [attack_sound_frame]\n            sound=entangle.wav\n        [/attack_sound_frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-250\n        [frame]\n            image=\"units/elves-wood/enchantress-melee-[1~6].png:[90*2,100*4]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n    [/attack_anim]"
    ]
  },
  "Elvish Fighter": {
    "id": "Elvish Fighter",
    "image": "units/elves-wood/fighter/fighter.png",
    "profile": "portraits/elves/fighter.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-445\n        [frame]\n            image=\"units/elves-wood/fighter/fighter-bow.png:65\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}\n        [frame]\n            image=\"units/elves-wood/fighter/fighter-bow-attack[1~4].png:[75*2,100,130]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/fighter/fighter-bow.png:65\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-275\n        offset=0.0:125,0.0~0.6:150,0.6~0.0:180\n        [frame]\n            image=\"units/elves-wood/fighter/fighter-melee-1.png:155\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -150}\n        [frame]\n            image=\"units/elves-wood/fighter/fighter-melee-[2,3,4].png:[80,80,125]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/fighter/fighter.png:15\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-275\n        offset=0.0:125,0.0~0.6:150,0.6~0.0:180\n        [frame]\n            image=\"units/elves-wood/fighter/fighter-melee-[1~4].png:[155,80,80,125]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/fighter/fighter.png:15\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        # make it less common than the previous one\n        frequency=2\n        start_time=-345\n        offset=0.0:195,0.0~0.6:150,0.6~0.0:180\n        [frame]\n            image=\"units/elves-wood/fighter/fighter-melee-[1~5]b.png:[90,90,125,80,125]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/fighter/fighter.png:15\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -150}\n    [/attack_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/elves-wood/fighter/fighter-se-run[1~10].png:60\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Elvish Hero": {
    "id": "Elvish Hero",
    "image": "units/elves-wood/hero.png",
    "profile": "portraits/elves/hero.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-445\n        [frame]\n            image=\"units/elves-wood/hero-bow.png:65\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}\n        [frame]\n            image=\"units/elves-wood/hero-bow-attack[1~4].png:[75*2,100,130]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/hero-bow.png:65\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/elves-wood/hero.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/hero-melee-[1~4].png:[65,35,150,45]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -75}\n        [frame]\n            image=\"units/elves-wood/hero-defend.png:60\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/hero.png:20\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Elvish High Lord": {
    "id": "Elvish High Lord",
    "image": "units/elves-wood/high-lord.png",
    "profile": "portraits/elves/high-lord.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=faerie fire\n        [/filter_attack]\n        {MISSILE_FRAME_FAERIE_FIRE}\n\n        start_time=-450\n        {SOUND:HIT_AND_MISS magic-faeriefire.ogg magic-faeriefire-miss.ogg -450}\n        [frame]\n            image=\"units/elves-wood/high-lord-magic.png:150,units/elves-wood/high-lord-magic-1.png\"\n            halo=halo/elven/faerie-fire-halo[1~7].png:75\n            halo_x,halo_y=-19,-14\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/elves-wood/high-lord.png:25\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/elves-wood/high-lord-attack-sword-[1~2].png:[100,175]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/high-lord.png:100\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Elvish Lady": {
    "id": "Elvish Lady",
    "image": "units/elves-wood/lady.png",
    "profile": "portraits/elves/lady.webp~CROP(0,20,380,380)",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=ensnare\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            offset=1.0\n            duration=150\n            image=\"projectiles/entangle.png\"\n            image_diagonal=\"projectiles/entangle.png\"\n        [/missile_frame]\n        start_time=-450\n        [frame]\n            image=\"units/elves-wood/lady.png\"\n            halo=halo/elven/nature-halo[1~8].png:75\n            halo_x,halo_y=0,-12\n        [/frame]\n        attack_sound_start_time=-75\n        [attack_sound_frame]\n            sound=entangle.wav\n        [/attack_sound_frame]\n    [/attack_anim]"
    ]
  },
  "Elvish Lord": {
    "id": "Elvish Lord",
    "image": "units/elves-wood/lord.png",
    "profile": "portraits/elves/lord.webp~RIGHT()",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=faerie fire\n        [/filter_attack]\n        {MISSILE_FRAME_FAERIE_FIRE}\n\n        start_time=-450\n        {SOUND:HIT_AND_MISS magic-faeriefire.ogg magic-faeriefire-miss.ogg -450}\n        [frame]\n            image=\"units/elves-wood/lord-magic.png:150,units/elves-wood/lord-magic-1.png\"\n            halo=halo/elven/faerie-fire-halo[1~7].png:75\n            halo_x,halo_y=-19,-13\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/elves-wood/lord.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/elves-wood/lord-melee.png:225\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/lord.png:75\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Elvish Marksman": {
    "id": "Elvish Marksman",
    "image": "units/elves-wood/marksman.png",
    "profile": "portraits/elves/marksman.webp~CROP(30,30,370,370)~FL()",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=longbow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-475\n        [frame]\n            image=\"units/elves-wood/marksman-bow.png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -400}\n        [frame]\n            image=\"units/elves-wood/marksman-bow-attack[1~4].png:[75*2,100,150]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/marksman-bow.png:75\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/elves-wood/marksman-sword.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/marksman-sword-[1~3].png:[100,175,75]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -75}\n        [frame]\n            image=\"units/elves-wood/marksman-sword.png:25\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=longbow\n            [/filter_attack]\n            [frame]\n                image=\"units/elves-wood/marksman+female-bow.png:75\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/marksman+female-bow-attack[1~4].png:[75*2,100,150]\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/marksman+female-bow.png:75\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=sword\n            [/filter_attack]\n            [frame]\n                image=\"units/elves-wood/marksman+female-sword.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/marksman+female-sword-[1~3].png:[100,175,75]\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/marksman+female-sword.png:25\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Elvish Marshal": {
    "id": "Elvish Marshal",
    "image": "units/elves-wood/marshal.png",
    "profile": "portraits/elves/captain.webp~CROP(8,60,370,380)",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-445\n        [frame]\n            image=\"units/elves-wood/marshal-bow.png:65\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}\n        [frame]\n            image=\"units/elves-wood/marshal-bow-attack[1~4].png:[75*2,100,130]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/marshal-bow.png:65\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-175\n        [frame]\n            image=\"units/elves-wood/marshal-melee-2.png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/elves-wood/marshal-melee-[1~2].png:[175,75]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/marshal.png:50\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/elves-wood/marshal-stand-[1~14].png:[150*14]\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Elvish Outrider": {
    "id": "Elvish Outrider",
    "image": "units/elves-wood/outrider/outrider.png",
    "profile": "portraits/elves/scout.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-500\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -500}\n        [frame]\n            image=\"units/elves-wood/outrider/outrider.png:[100,250,100]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/outrider/outrider.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-300\n        offset=\"0.0:150,0.0~0.6:150,0.6~0.0:220\"\n        [frame]\n            image=\"units/elves-wood/outrider/outrider-melee-0.png:80\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/outrider/outrider-melee-1.png:70\"\n            sound=horse-elf-canter.wav\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/outrider/outrider-melee-[2,3].png:[75,90]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/elves-wood/outrider/outrider-melee-[4,5,6].png:[90,80,75]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/outrider/outrider.png:1\"\n        [/frame]\n    [/attack_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/elves-wood/outrider/outrider.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Elvish Ranger": {
    "id": "Elvish Ranger",
    "image": "units/elves-wood/ranger.png",
    "profile": "portraits/elves/ranger.webp~CROP(20,20,400,400)",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-445\n        [frame]\n            image=\"units/elves-wood/ranger-bow.png:65\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/ranger-bow-attack[1~4].png:[75*2,100,130]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/ranger-bow.png:65\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/elves-wood/ranger-sword.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/ranger-sword-[1~3].png:[100,150,100]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/ranger-sword.png:25\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -75}\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=bow\n            [/filter_attack]\n            missile_start_time=-150\n            [missile_frame]\n                duration=150\n                image=\"projectiles/missile-n.png\"\n                image_diagonal=\"projectiles/missile-ne.png\"\n            [/missile_frame]\n            start_time=-445\n            [frame]\n                image=\"units/elves-wood/ranger+female-bow.png:65\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/ranger+female-bow-attack[1~4].png:[75*2,100,130]\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/ranger+female-bow.png:65\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=sword\n            [/filter_attack]\n            start_time=-200\n            [frame]\n                image=\"units/elves-wood/ranger+female-sword.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/ranger+female-sword-[1~3].png:[100,150,100]\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/ranger+female-sword.png:25\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Elvish Rider": {
    "id": "Elvish Rider",
    "image": "units/elves-wood/rider/rider.png",
    "profile": "portraits/elves/scout.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-500\n        [if]\n            hits=yes\n            [frame]\n                image=\"units/elves-wood/rider/rider.png:100\"\n                sound=bow.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [frame]\n                image=\"units/elves-wood/rider/rider.png:100\"\n                sound=bow-miss.ogg\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/elves-wood/rider/rider.png:[250,100]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/rider/rider.png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/elves-wood/rider/rider.png:25\"\n            sound=horse-elf-canter.wav\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/rider/rider.png:75\"\n        [/frame]\n        [if]\n            hits=no\n            [frame]\n                image=\"units/elves-wood/rider/rider.png:200\"\n                sound={SOUND_LIST:MISS}\n            [/frame]\n        [/if]\n        [else]\n            hits=yes\n            [frame]\n                image=\"units/elves-wood/rider/rider.png:200\"\n                sound={SOUND_LIST:SWORD_SWISH}\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/elves-wood/rider/rider.png:75\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/rider/rider.png:25\"\n        [/frame]\n    [/attack_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/elves-wood/rider/rider.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Elvish Scout": {
    "id": "Elvish Scout",
    "image": "units/elves-wood/scout/scout.png",
    "profile": "portraits/elves/scout.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-400\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -400}\n        [frame]\n            image=\"units/elves-wood/scout/scout-bow.png:60\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/scout/scout-bow-attack[1~4].png:[60,60,70,180]\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/scout/scout-bow.png:80\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-300\n        offset=0.0~-0.05:160,-0.05~0.6:140,0.6~0.0:200\n        [frame]\n            image=\"units/elves-wood/scout/scout-melee-[1~5].png:[100,80,70,100,150]\"\n            sound=horse-elf-canter.wav\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/elves-wood/scout/scout.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Elvish Shaman": {
    "id": "Elvish Shaman",
    "image": "units/elves-wood/shaman.png",
    "profile": "portraits/elves/shaman.webp~CROP(10,10,390,390)",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=entangle\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            offset=1.0\n            duration=150\n            image=\"projectiles/entangle.png\"\n            image_diagonal=\"projectiles/entangle.png\"\n        [/missile_frame]\n        start_time=-450\n        [frame]\n            image=\"units/elves-wood/shaman.png:225,units/elves-wood/shaman-attack2.png:225,units/elves-wood/shaman.png:100\"\n            halo=halo/elven/nature-halo[1~6].png:75,halo/elven/nature-halo[7~8].png:50\n            halo_x,halo_y=0,-12\n        [/frame]\n        attack_sound_start_time=-75\n        [attack_sound_frame]\n            sound=entangle.wav\n        [/attack_sound_frame]\n        [frame]\n            image=\"units/elves-wood/shaman.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        start_time=-175\n        [frame]\n            image=\"units/elves-wood/shaman.png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/elves-wood/shaman-attack.png:200\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/shaman.png:75\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Elvish Sharpshooter": {
    "id": "Elvish Sharpshooter",
    "image": "units/elves-wood/sharpshooter.png",
    "profile": "portraits/elves/marksman.webp~CROP(30,30,370,370)~FL()",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=longbow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-445\n        [frame]\n            image=\"units/elves-wood/sharpshooter-bow.png:65\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}\n        [frame]\n            image=\"units/elves-wood/sharpshooter-bow-attack[1~5].png:[75*2,100,130,150]\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/elves-wood/sharpshooter-sword.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/elves-wood/sharpshooter-sword-[1~3].png:[100,175,75]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -75}\n        [frame]\n            image=\"units/elves-wood/sharpshooter-sword.png:25\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=longbow\n            [/filter_attack]\n            [frame]\n                image=\"units/elves-wood/sharpshooter+female-bow.png:65\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/sharpshooter+female-bow-attack[1~5].png:[75*2,100,130,150]\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=sword\n            [/filter_attack]\n            [frame]\n                image=\"units/elves-wood/sharpshooter+female-sword.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/sharpshooter+female-sword-[1~3].png:[100,175,75]\"\n            [/frame]\n            [frame]\n                image=\"units/elves-wood/sharpshooter+female-sword.png:25\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Elvish Shyde": {
    "id": "Elvish Shyde",
    "image": "units/elves-wood/shyde.png",
    "profile": "portraits/elves/shyde.webp~CROP(110,60,390,390)",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=thorns\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            duration=200\n            image=\"projectiles/thorns.png\"\n            image_diagonal=\"projectiles/thorns-ne.png\"\n        [/missile_frame]\n        start_time=-250\n        [frame]\n            image=\"units/elves-wood/shyde-ftouch-attack3.png\"\n            halo=halo/elven/nature-halo[1~8].png:75\n            halo_x,halo_y=0,-12\n        [/frame]\n        {SOUND:HIT_AND_MISS magic-thorns-[1,2].ogg magic-thorns-miss-[1,2].ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=ensnare\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            offset=1.0\n            duration=150\n            image=\"projectiles/entangle.png\"\n            image_diagonal=\"projectiles/entangle.png\"\n        [/missile_frame]\n        start_time=-450\n        [frame]\n            image=\"units/elves-wood/shyde-ftouch-attack3.png\"\n            halo=halo/elven/nature-halo[1~8].png:75\n            halo_x,halo_y=0,-12\n        [/frame]\n        attack_sound_start_time=-75\n        [attack_sound_frame]\n            sound=entangle.wav\n        [/attack_sound_frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=faerie touch\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/elves-wood/shyde-ftouch-attack[1~3].png:[100,200,100]\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Elvish Sorceress": {
    "id": "Elvish Sorceress",
    "image": "units/elves-wood/sorceress.png",
    "profile": "portraits/elves/sorceress.webp~CROP(3,7,400,400)",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=faerie fire\n        [/filter_attack]\n        {MISSILE_FRAME_FAERIE_FIRE}\n\n        start_time=-450\n        {SOUND:HIT_AND_MISS magic-faeriefire.ogg magic-faeriefire-miss.ogg -450}\n        [frame]\n            image=\"units/elves-wood/sorceress-magic-[1~3,3,3~1].png:75\"\n            halo=halo/elven/faerie-fire-halo[1~7].png\n            halo_x,halo_y=0,-28\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=entangle\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            offset=1.0\n            duration=150\n            image=\"projectiles/entangle.png\"\n            image_diagonal=\"projectiles/entangle.png\"\n        [/missile_frame]\n\n        start_time=-450\n        [frame]\n            image=\"units/elves-wood/sorceress-magic-[1~3,2,1].png:[75*2,300,75*2]\"\n            halo=halo/elven/nature-halo[1~8].png:75\n            halo_x,halo_y=0,-28\n        [/frame]\n        attack_sound_start_time=-75\n        [attack_sound_frame]\n            sound=entangle.wav\n        [/attack_sound_frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        start_time=-350\n        offset=0.0~-0.25:150,-0.25~0.1:100,0.1~0.5:250,0.5~0.6:100, 0.6~0.6:150,0.6~0.15:200,0.15~0.0:150\n\n        [frame]\n            image=\"units/elves-wood/sorceress-melee-attack-[1~10,1,2].png:[80*5,100*2,80*5]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n    [/attack_anim]"
    ]
  },
  "Elvish Sylph": {
    "id": "Elvish Sylph",
    "image": "units/elves-wood/sylph.png",
    "profile": "portraits/elves/sylph.webp~CROP(26,30,420,420)",
    "level": "4",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=faerie fire\n        [/filter_attack]\n        {MISSILE_FRAME_FAERIE_FIRE}\n\n        start_time=-450\n        {SOUND:HIT_AND_MISS magic-faeriefire.ogg magic-faeriefire-miss.ogg -450}\n        [frame]\n            image=\"units/elves-wood/sylph.png\"\n            halo=halo/elven/faerie-fire-halo[1~7].png:75\n            halo_x,halo_y=0,-28\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=gossamer\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            duration=150\n            image=\"projectiles/web.png\"\n            image_diagonal=\"projectiles/web.png\"\n        [/missile_frame]\n        start_time=-450\n        [frame]\n            image=\"units/elves-wood/sylph.png\"\n            halo=halo/elven/faerie-fire-halo[1~7].png:75\n            halo_x,halo_y=0,-28\n        [/frame]\n        attack_sound_start_time=-75\n        [attack_sound_frame]\n            sound=entangle.wav\n        [/attack_sound_frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=faerie touch\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/elves-wood/sylph.png:[400]\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Direwolf Rider": {
    "id": "Direwolf Rider",
    "image": "units/goblins/direwolver.png",
    "profile": "portraits/goblins/direwolver.webp~CROP(60,0,390,390)",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/goblins/direwolver.png:50\"\n            sound={SOUND_LIST:WOLF_GROWL}\n        [/frame]\n        [frame]\n            image=\"units/goblins/direwolver-moving.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/goblins/direwolver-attack.png:150\"\n        [/frame]\n        [frame]\n            image=\"units/goblins/direwolver-moving.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/goblins/direwolver.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        offset=0.0~-0.1:100,-0.1~0.0:50,0.0~0.3:50,0.3~0.5:100,0.5~0.6:50,0.6~0.4:100,0.4~0.2:50,0.2~0.0:100\n        start_time=-350\n        [frame]\n            image=\"units/goblins/direwolver.png:100\"\n            sound={SOUND_LIST:WOLF_GROWL}\n        [/frame]\n        [frame]\n            image=\"units/goblins/direwolver-attack.png:200\"\n        [/frame]\n        {SOUND:HIT bite.ogg -100}\n        [frame]\n            image=\"units/goblins/direwolver-moving.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/goblins/direwolver.png:50\"\n        [/frame]\n    [/attack_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/goblins/direwolver-moving.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Goblin Impaler": {
    "id": "Goblin Impaler",
    "image": "units/goblins/impaler.png",
    "profile": "portraits/goblins/impaler.webp~CROP(0,100,400,400)",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=ranged\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n        start_time=-250\n        [frame]\n            image=\"units/goblins/impaler-attack-se-1.png:100\"\n            sound={SOUND_LIST:THROW}\n        [/frame]\n        [frame]\n            image=\"units/goblins/impaler-attack-ranged-s.png:100\"\n        [/frame]\n        {SOUND:HIT spear.ogg -100}\n        [frame]\n            image=\"units/goblins/impaler-death-1.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n        direction=ne,nw\n        start_time=-200\n        [frame]\n            image=units/goblins/impaler.png:75\n        [/frame]\n        [frame]\n            image=units/goblins/impaler-attack-ne.png:250\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -75}\n        [frame]\n            image=units/goblins/impaler.png:75\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n        direction=n\n        start_time=-200\n        [frame]\n            image=units/goblins/impaler.png:75\n        [/frame]\n        [frame]\n            image=units/goblins/impaler-attack-n.png:250\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -75}\n        [frame]\n            image=units/goblins/impaler.png:75\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n        direction=s\n        start_time=-200\n        [frame]\n            image=units/goblins/impaler.png:75\n        [/frame]\n        [frame]\n            image=units/goblins/impaler-attack-[se-1,s,se-1].png:[50,150,50]\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -75}\n        [frame]\n            image=units/goblins/impaler.png:75\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n        direction=se,sw\n        start_time=-200\n        [frame]\n            image=units/goblins/impaler.png:75\n        [/frame]\n        [frame]\n            image=units/goblins/impaler-attack-se-[1,2,1].png:[50,150,50]\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -75}\n        [frame]\n            image=units/goblins/impaler.png:75\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Goblin Knight": {
    "id": "Goblin Knight",
    "image": "units/goblins/knight.png",
    "profile": "portraits/goblins/direwolver.webp~CROP(60,0,390,390)",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        offset=0.0~-0.1:100,-0.1~0.0:50,0.0~0.3:50,0.3~0.5:100,0.5~0.6:50,0.6~0.4:100,0.4~0.2:50,0.2~0.0:100\n        start_time=-350\n        [frame]\n            image=\"units/goblins/knight.png:100\"\n            sound={SOUND_LIST:WOLF_GROWL}\n        [/frame]\n        [frame]\n            image=\"units/goblins/knight-attack.png:200\"\n        [/frame]\n        {SOUND:HIT bite.ogg -100}\n        [frame]\n            image=\"units/goblins/knight-moving.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/goblins/knight.png:50\"\n        [/frame]\n    [/attack_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/goblins/knight-moving.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Goblin Pillager": {
    "id": "Goblin Pillager",
    "image": "units/goblins/pillager.png",
    "profile": "portraits/goblins/pillager.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=net\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            duration=200\n            image=\"projectiles/web.png\"\n            image_diagonal=\"projectiles/web.png\"\n        [/missile_frame]\n        start_time=-200\n        [frame]\n            image=\"units/goblins/pillager-defend-1.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS net.wav {SOUND_LIST:MISS} -150}\n        [frame]\n            image=\"units/goblins/pillager-attack2.png:75\"\n        [/frame]\n        [frame]\n            image=\"units/goblins/pillager.png:175\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=torch\n        [/filter_attack]\n        start_time=-200\n        {SOUND:HIT_AND_MISS torch.ogg torch-miss.ogg -200}\n        [frame]\n            image=\"units/goblins/pillager-moving.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/goblins/pillager-attack.png:150\"\n        [/frame]\n        [frame]\n            image=\"units/goblins/pillager-moving.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        offset=0.0~-0.1:100,-0.1~0.0:50,0.0~0.3:50,0.3~0.5:100,0.5~0.6:50,0.6~0.4:100,0.4~0.2:50,0.2~0.0:100\n        start_time=-350\n        [frame]\n            image=\"units/goblins/pillager.png:100\"\n            sound={SOUND_LIST:WOLF_GROWL}\n        [/frame]\n        [frame]\n            image=\"units/goblins/pillager-attack.png:200\"\n        [/frame]\n        {SOUND:HIT bite.ogg -100}\n        [frame]\n            image=\"units/goblins/pillager-moving.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/goblins/pillager.png:50\"\n        [/frame]\n    [/attack_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/goblins/pillager-moving.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Goblin Rouser": {
    "id": "Goblin Rouser",
    "image": "units/goblins/rouser.png",
    "profile": "portraits/goblins/rouser.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        direction=se,sw\n        start_time=-200\n        [frame]\n            image=units/goblins/rouser.png:25\n        [/frame]\n        [frame]\n            image=units/goblins/rouser-defend.png:50\n        [/frame]\n        [frame]\n            image=units/goblins/rouser-attack[1,-se,3~4].png:[50,150,50*2]\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -75}\n        [frame]\n            image=units/goblins/rouser.png:25\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        direction=ne,nw\n        start_time=-200\n        [frame]\n            image=units/goblins/rouser.png:25\n        [/frame]\n        [frame]\n            image=units/goblins/rouser-defend.png:50\n        [/frame]\n        [frame]\n            image=units/goblins/rouser-attack[1,-ne,3~4].png:[50,150,50*2]\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -75}\n        [frame]\n            image=units/goblins/rouser.png:25\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        direction=s\n        start_time=-200\n        [frame]\n            image=units/goblins/rouser-attack[4,-s,4].png:[100,200,100]\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        direction=n\n        start_time=-200\n        [frame]\n            image=units/goblins/rouser-attack[4,-n,4].png:[100,200,100]\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Goblin Spearman": {
    "id": "Goblin Spearman",
    "image": "units/goblins/spearman.png",
    "profile": "portraits/goblins/spearman.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=ranged\n        [/filter_attack]\n        direction=se,sw\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n        start_time=-200\n        [frame]\n            image=\"units/goblins/spearman.png:100\"\n            sound={SOUND_LIST:THROW}\n        [/frame]\n        {SOUND:HIT spear.ogg -100}\n        [frame]\n            image=\"units/goblins/spearman-attack-se1.png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=ranged\n        [/filter_attack]\n        direction=s\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n        start_time=-200\n        [frame]\n            image=\"units/goblins/spearman.png:100\"\n            sound={SOUND_LIST:THROW}\n        [/frame]\n        {SOUND:HIT spear.ogg -100}\n        [frame]\n            image=\"units/goblins/spearman-attack-s1.png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=ranged\n        [/filter_attack]\n        direction=ne,nw\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n        start_time=-200\n        [frame]\n            image=\"units/goblins/spearman.png:100\"\n            sound={SOUND_LIST:THROW}\n        [/frame]\n        {SOUND:HIT spear.ogg -100}\n        [frame]\n            image=\"units/goblins/spearman-attack-ne1.png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=ranged\n        [/filter_attack]\n        direction=n\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n        start_time=-200\n        [frame]\n            image=\"units/goblins/spearman.png:100\"\n            sound={SOUND_LIST:THROW}\n        [/frame]\n        {SOUND:HIT spear.ogg -100}\n        [frame]\n            image=\"units/goblins/spearman-attack-n1.png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n        direction=se,sw\n        start_time=-200\n        [frame]\n            image=units/goblins/spearman-attack-se[1,2,1].png:[100,200,100]\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n        direction=ne,nw\n        start_time=-200\n        [frame]\n            image=units/goblins/spearman-attack-ne[1,2,1].png:[100,200,100]\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n        direction=s\n        start_time=-200\n        [frame]\n            image=units/goblins/spearman-attack-s[1,2,1].png:[100,200,100]\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n        direction=n\n        start_time=-200\n        [frame]\n            image=units/goblins/spearman-attack-n[1,2,1].png:[100,200,100]\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Wolf Rider": {
    "id": "Wolf Rider",
    "image": "units/goblins/wolf-rider.png",
    "profile": "portraits/goblins/wolf-rider.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        offset=0.0~-0.1:100,-0.1~0.0:50,0.0~0.3:50,0.3~0.5:100,0.5~0.6:50,0.6~0.4:100,0.4~0.2:50,0.2~0.0:100\n        start_time=-350\n        [frame]\n            image=\"units/goblins/wolf-rider.png:100\"\n            sound={SOUND_LIST:WOLF_GROWL}\n        [/frame]\n        [frame]\n            image=\"units/goblins/wolf-rider-attack.png:200\"\n        [/frame]\n        {SOUND:HIT bite.ogg -100}\n        [frame]\n            image=\"units/goblins/wolf-rider-moving.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/goblins/wolf-rider.png:50\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=-50\n        [frame]\n            image=\"units/goblins/wolf-rider.png:50\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=-50\n        terrain_type=!,*^B*,Cme*^*,Kme*^*,Wwr*^*,Wwf*^*,!,Chs*^*,Chw*^*,Cm*^*,Km*^*,W*^*,S*^*,*^Vm\n        [frame]\n            image=\"units/goblins/wolf-rider-water.png:50\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=-0\n        [frame]\n            image=\"units/goblins/wolf-rider-moving.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Gryphon": {
    "id": "Gryphon",
    "image": "units/monsters/gryphon.png",
    "profile": "portraits/monsters/gryphon.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/monsters/gryphon-flying-[5,4,5].png:[100,200,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        layer=60\n        [frame]\n            image=\"units/monsters/gryphon-flying-[1~8].png:150\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/monsters/gryphon-flying-[1~8].png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Gryphon Master": {
    "id": "Gryphon Master",
    "image": "units/dwarves/gryphon-master.png",
    "profile": "portraits/dwarves/gryphon-rider.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/dwarves/gryphon-master-flying-[4,5,4].png:[100,200,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        layer=60\n        [frame]\n            image=\"units/dwarves/gryphon-master-flying-[1~8].png:150\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/dwarves/gryphon-master-flying-[1~8].png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Gryphon Rider": {
    "id": "Gryphon Rider",
    "image": "units/dwarves/gryphon-rider.png",
    "profile": "portraits/dwarves/gryphon-rider.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/dwarves/gryphon-rider-flying-[5,4,5].png:[100,200,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        layer=60\n        [frame]\n            image=\"units/dwarves/gryphon-rider-flying-[1~8].png:150\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/dwarves/gryphon-rider-flying-[1~8].png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Horseman": {
    "id": "Horseman",
    "image": "units/human-loyalists/horseman/horseman.png",
    "profile": "portraits/humans/horseman.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n\n        start_time=-400\n        sound_start_time=-400\n        offset=0.0~0.3:300,0.3~0.45:210,0.45~0.0:420\n\n        [sound_frame]\n            sound=horse-canter.wav\n        [/sound_frame]\n\n        [if]\n            direction=n\n            [frame]\n                image=\"units/human-loyalists/horseman/horseman-n-attack[1~12].png:[100*3,70*9]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=nw,ne\n            [frame]\n                image=\"units/human-loyalists/horseman/horseman-ne-attack[1~12].png:[100*3,70*9]\"\n            [/frame]\n        [/else]\n        [else]\n            direction=sw,se\n            [frame]\n                image=\"units/human-loyalists/horseman/horseman-se-attack[1~12].png:[100*3,70*9]\"\n            [/frame]\n        [/else]\n        [else]\n            direction=s\n            [frame]\n                image=\"units/human-loyalists/horseman/horseman-s-attack[1~12].png:[100*3,70*9]\"\n            [/frame]\n        [/else]\n\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/human-loyalists/horseman/horseman-breeze-[1~4,2,5].png:[200,300*3,200*2]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/human-loyalists/horseman/horseman-ne-breeze-[1~4,2,5].png:[200,300*3,200*2]\"\n            [/frame]\n        [/else]\n    [/standing_anim]"
    ]
  },
  "Grand Knight": {
    "id": "Grand Knight",
    "image": "units/human-loyalists/grand-knight/grand-knight.png",
    "profile": "portraits/humans/grand-knight.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=lance\n        [/filter_attack]\n        start_time=-480\n        offset=0.0~-0.1:240,-0.1~0.7:240,0.7~0.8:140,0.8~0.0:441\n        [frame]\n            image=\"units/human-loyalists/grand-knight/grand-knight-se-attack[1~3].png:80\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/grand-knight/grand-knight-se-attack[4~6].png:[90,110,140]\"\n            sound=horse-canter.wav\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -200}\n        [if]\n            hits=yes\n            [frame]\n                image=\"units/human-loyalists/grand-knight/grand-knight-se-attack[7~11].png:[70,70,140,100,100]\"\n            [/frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"units/human-loyalists/grand-knight/grand-knight-se-attack[6b,7b,9~11].png:[70,70,140,100,100]\"\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/human-loyalists/grand-knight/grand-knight.png:1\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/human-loyalists/grand-knight/grand-knight.png:50\"\n            sound=horse-canter.wav\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-loyalists/grand-knight/grand-knight.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/grand-knight/grand-knight.png:100\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/grand-knight/grand-knight.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/grand-knight/grand-knight-se-breeze[1~3,2,1].png:[400,600,900,300,250]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        {WOUNDED_UNIT ()}\n        [frame]\n            image=\"units/human-loyalists/grand-knight/grand-knight.png:850\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/grand-knight/grand-knight-se-bob[1~3,2,1].png:[450,300,200,550,650]\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/grand-knight/grand-knight.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Knight": {
    "id": "Knight",
    "image": "units/human-loyalists/knight/knight.png",
    "profile": "portraits/humans/knight.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=lance\n        [/filter_attack]\n\n        start_time=-400\n        sound_start_time=-400\n        offset=0.0~0.3:300,0.3~0.45:210,0.45~0.0:420\n\n        [sound_frame]\n            sound=horse-canter.wav\n        [/sound_frame]\n\n        [if]\n            direction=n\n            [frame]\n                image=\"units/human-loyalists/knight/knight-n-attack[1~12].png:[100*3,70*9]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=nw,ne\n            [frame]\n                image=\"units/human-loyalists/knight/knight-ne-attack[1~12].png:[100*3,70*9]\"\n            [/frame]\n        [/else]\n        [else]\n            direction=sw,se\n            [frame]\n                image=\"units/human-loyalists/knight/knight-se-attack[1~12].png:[100*3,70*9]\"\n            [/frame]\n        [/else]\n        [else]\n            direction=s\n            [frame]\n                image=\"units/human-loyalists/knight/knight-s-attack[1~12].png:[100*3,70*9]\"\n            [/frame]\n        [/else]\n\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -200}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n\n        start_time=-400\n        sound_start_time=-400\n        offset=0.0~0.3:300,0.3~0.45:210,0.45~0.0:420\n\n        [sound_frame]\n            sound=horse-canter.wav\n        [/sound_frame]\n\n        [if]\n            direction=n\n            [frame]\n                image=\"units/human-loyalists/knight/knight-n-slash[1~12].png:[100*3,70*9]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=nw,ne\n            [frame]\n                image=\"units/human-loyalists/knight/knight-ne-slash[1~12].png:[100*3,70*9]\"\n            [/frame]\n        [/else]\n        [else]\n            direction=sw,se\n            [frame]\n                image=\"units/human-loyalists/knight/knight-se-slash[1~12].png:[100*3,70*9]\"\n            [/frame]\n        [/else]\n        [else]\n            direction=s\n            [frame]\n                image=\"units/human-loyalists/knight/knight-s-slash[1~12].png:[100*3,70*9]\"\n            [/frame]\n        [/else]\n\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/human-loyalists/knight/knight-breeze-[1~4,2,5].png:[200,300*3,200*2]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/human-loyalists/knight/knight-ne-breeze-[1~4,2,5].png:[200,300*3,200*2]\"\n            [/frame]\n        [/else]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/knight/knight.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Lancer": {
    "id": "Lancer",
    "image": "units/human-loyalists/lancer/lancer.png",
    "profile": "portraits/humans/lancer.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=lance\n        [/filter_attack]\n        start_time=-250\n        # this is a placeholder, it looks better than the lance-up default image, but it is not really an animation\n        [frame]\n            image=\"units/human-loyalists/lancer/lancer-se-attack1.png:25\"\n            sound=horse-canter.wav\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/lancer/lancer-se-attack[1,1,1,1].png:[75,300,50,25]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -150}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/lancer/lancer-breeze-[1~4,2,5].png::[200,300*3,200*2]\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/lancer/lancer.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Paladin": {
    "id": "Paladin",
    "image": "units/human-loyalists/paladin/paladin.png",
    "profile": "portraits/humans/paladin.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=lance\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/human-loyalists/paladin/paladin.png:50\"\n            sound=horse-canter.wav\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -200}\n        [frame]\n            image=\"units/human-loyalists/paladin/paladin.png:350\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/paladin/paladin.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/human-loyalists/paladin/paladin.png:50\"\n            sound=horse-canter.wav\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-loyalists/paladin/paladin.png:250\"\n            sound={SOUND_LIST:MISS}\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/paladin/paladin.png:100\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/paladin/paladin.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/paladin/paladin-breeze-s-[1~6,1~3,2,1~3].png:[100*6,200*7]\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/paladin/paladin.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Bowman": {
    "id": "Bowman",
    "image": "units/human-loyalists/bowman.png",
    "profile": "portraits/humans/bowman.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        start_time=-445\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/human-loyalists/bowman-bow.png:65\"\n            [/frame]\n            [frame]\n                image=\"units/human-loyalists/bowman-bow-attack-[1~4,1].png:[75*2,100,130,65]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/human-loyalists/bowman-ne-bow.png:65\"\n            [/frame]\n            [frame]\n                image=\"units/human-loyalists/bowman-ne-bow-attack-[1~4,1].png:[75*2,100,130,65]\"\n            [/frame]\n            [frame]\n                image=\"units/human-loyalists/bowman-ne-bow.png:35\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -230}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=short sword\n        [/filter_attack]\n        start_time=-275\n\n        [frame]\n            image=\"units/human-loyalists/bowman-melee-defend-1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/bowman-melee-attack-[1~4].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS knife.ogg {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-loyalists/bowman-melee-defend-1.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Cavalier": {
    "id": "Cavalier",
    "image": "units/human-loyalists/cavalier/cavalier.png",
    "profile": "portraits/humans/cavalier.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n        [/filter_attack]\n        start_time=-1100\n        [frame]\n            image=\"units/human-loyalists/cavalier/cavalier.png:[100*5,200,300]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS crossbow.ogg crossbow-miss.ogg -300}\n\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-225\n        [frame]\n            image=\"units/human-loyalists/cavalier/cavalier.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/cavalier/cavalier.png:50\"\n            sound=horse-canter.wav\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-loyalists/cavalier/cavalier.png:300\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/cavalier/cavalier.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/cavalier/cavalier.png:25\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/cavalier/cavalier-breeze-s-[1~3,2,3~1].png:300\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/cavalier/cavalier.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Cavalryman": {
    "id": "Cavalryman",
    "image": "units/human-loyalists/cavalryman/cavalryman.png",
    "profile": "portraits/humans/cavalryman.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-350\n        offset=0.0~-0.05:200,-0.05~0.6:150,0.6~0.0:325\n        [frame]\n            image=\"units/human-loyalists/cavalryman/cavalryman-attack1.png:80\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/cavalryman/cavalryman-attack[2~6].png:[70,100,100,150,150]\"\n            sound=horse-canter.wav\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-loyalists/cavalryman/cavalryman.png:25\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/cavalryman/cavalryman.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/cavalryman/cavalryman-breeze[1~3,2,1].png:250\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        {WOUNDED_UNIT ()}\n        [frame]\n            image=\"units/human-loyalists/cavalryman/cavalryman-bob[1~3,2,1].png:[350,250,550,650,700]\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/cavalryman/cavalryman.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Dragoon": {
    "id": "Dragoon",
    "image": "units/human-loyalists/dragoon/dragoon.png",
    "profile": "portraits/humans/cavalier.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n        [/filter_attack]\n        start_time=-700\n        [frame]\n            image=\"units/human-loyalists/dragoon/dragoon-xbow-[1~4,2~1].png:[130*2,440,100,160*2]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS crossbow.ogg crossbow-miss.ogg -200}\n\n        missile_start_time=-150\n        missile_y=-12~-6:150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-225\n        [frame]\n            image=\"units/human-loyalists/dragoon/dragoon.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/dragoon/dragoon.png:50\"\n            sound=horse-canter.wav\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-loyalists/dragoon/dragoon.png:300\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/dragoon/dragoon.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/dragoon/dragoon.png:25\"\n        [/frame]\n    [/attack_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/dragoon/dragoon.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Duelist": {
    "id": "Duelist",
    "image": "units/human-loyalists/duelist.png",
    "profile": "portraits/humans/duelist.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-350\n        {SOUND:HIT_AND_MISS crossbow.ogg crossbow-miss.ogg -300}\n        [frame]\n            image=\"units/human-loyalists/duelist-ranged.png:400\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=saber\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/human-loyalists/duelist.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-loyalists/duelist-attack.png:200\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/duelist.png:100\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Fencer": {
    "id": "Fencer",
    "image": "units/human-loyalists/fencer.png",
    "profile": "portraits/humans/fencer.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=saber\n        [/filter_attack]\n        start_time=-350\n        [frame]\n            image=\"units/human-loyalists/fencer-attack-[1~9,1].png:50\"\n            offset=0.0~-0.07,-0.07~-0.15,-0.15~-0.25,-0.25~-0.2,-0.2~-0.1,-0.1~0.25,0.25~0.55,0.55~0.25,0.25~0.1,0.1~0.0\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        {WOUNDED_UNIT ()}\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/fencer-stand-[1~8].png:[200,80*6,200]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/fencer.png:80\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "General": {
    "id": "General",
    "image": "units/human-loyalists/general.png",
    "profile": "portraits/humans/general.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-400\n        [frame]\n            image=\"units/human-loyalists/general-crossbow.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS crossbow.ogg crossbow-miss.ogg -300}\n        [frame]\n            image=\"units/human-loyalists/general-crossbow-attack[1~2].png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-525\n        offset=0.0~-0.05:325,-0.05~0.6:200,0.6~0.0:250\n        [frame]\n            image=\"units/human-loyalists/general-melee[1~6].png:[130,110,110,75,100,125]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-loyalists/general.png:125\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/general.png:600\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/general-breeze[1~4,1].png:[400*3,200,600]\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Grand Marshal": {
    "id": "Grand Marshal",
    "image": "units/human-loyalists/marshal.png",
    "profile": "portraits/humans/marshal.webp",
    "level": "4",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-400\n        [frame]\n            image=\"units/human-loyalists/marshal-crossbow.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS crossbow.ogg crossbow-miss.ogg -300}\n        [frame]\n            image=\"units/human-loyalists/marshal-crossbow-attack[1~2].png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-300\n        [frame]\n            image=\"units/human-loyalists/marshal.png:50\"\n            offset=0.0~0.1\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/marshal-defend-1.png:50\"\n            offset=0.1~0.15\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/marshal-attack-sword[1~5].png:[100,75,100,50,75]\"\n            offset=0.15~0.35:100,0.35~0.45:75,0.45~0.5:100,0.5:20,0.5~0.4:30,0.4~0.2:75\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-loyalists/marshal.png:75\"\n            offset=0.2~0.0\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Halberdier": {
    "id": "Halberdier",
    "image": "units/human-loyalists/halberdier.png",
    "profile": "portraits/humans/halberdier.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=blade\n        [/filter_attack]\n        start_time=-380\n        offset=0.0:210,0.0~0.65:150,0.65:70,0.65~0.0:200\n        [frame]\n            image=\"units/human-loyalists/halberdier-slash-se-[1~4,1].png:[130,100,100,125,100]\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/halberdier.png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=pierce\n        [/filter_attack]\n        direction=ne,nw\n        start_time=-200\n        [frame]\n            image=\"units/human-loyalists/halberdier.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n        [frame]\n            image=\"units/human-loyalists/halberdier-pierce-ne.png:200\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/halberdier.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=pierce\n        [/filter_attack]\n        direction=se,sw\n        start_time=-200\n        [frame]\n            image=\"units/human-loyalists/halberdier-pierce-se-[1,2,1].png:[100*3]\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/halberdier.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=pierce\n        [/filter_attack]\n        direction=n\n        start_time=-250\n        [frame]\n            image=\"units/human-loyalists/halberdier.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/halberdier-pierce-[ne,n,ne].png:[100,200,50]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n        [frame]\n            image=\"units/human-loyalists/halberdier.png:25\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=halberd\n            type=pierce\n        [/filter_attack]\n        direction=s\n        start_time=-250\n        [frame]\n            image=\"units/human-loyalists/halberdier.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n        [frame]\n            image=\"units/human-loyalists/halberdier-pierce-[se-1,s,se-1].png:[50,250,50]\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/halberdier.png:25\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Heavy Infantryman": {
    "id": "Heavy Infantryman",
    "image": "units/human-loyalists/heavyinfantry.png",
    "profile": "portraits/humans/heavy-infantry.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace\n        [/filter_attack]\n        start_time=-550\n        [frame]\n            image=\"units/human-loyalists/heavyinfantry-attack-[1~15].png:[70*5,50*4,100,75,50*4]\"\n            offset=0.0\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n        [frame]\n            image=\"units/human-loyalists/heavyinfantry.png:100\"\n            offset=0.0\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Iron Mauler": {
    "id": "Iron Mauler",
    "image": "units/human-loyalists/siegetrooper.png",
    "profile": "portraits/humans/iron-mauler.webp~RIGHT()",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=flail\n        [/filter_attack]\n        start_time=-260\n        [frame]\n            image=\"units/human-loyalists/siegetrooper-attack-[1~6].png:[85,100,125,50*3]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS flail.ogg flail-miss.ogg -260}\n    [/attack_anim]"
    ]
  },
  "Javelineer": {
    "id": "Javelineer",
    "image": "units/human-loyalists/javelineer.png",
    "profile": "portraits/humans/javelineer.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=javelin\n        [/filter_attack]\n        missile_start_time=0\n        [missile_frame]\n            duration=150\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n        start_time=-250\n        [frame]\n            image=\"units/human-loyalists/javelineer-attack-ranged-[1~4].png:[100*3,50]\"\n        [/frame]\n        attack_sound_start_time=-50\n        [attack_sound_frame]\n            duration=100\n            sound={SOUND_LIST:THROW}\n        [/attack_sound_frame]\n        [if]\n            hits=yes\n            [attack_sound_frame]\n                sound=spear.ogg\n            [/attack_sound_frame]\n        [/if]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        start_time=-300\n        [frame]\n            image=\"units/human-loyalists/javelineer-attack-melee-[1~3].png:[100*2,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n        [frame]\n            image=\"units/human-loyalists/javelineer-attack-ranged-1.png:75\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/javelineer-attack-melee-1.png:75\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/javelineer.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Lieutenant": {
    "id": "Lieutenant",
    "image": "units/human-loyalists/lieutenant.png",
    "profile": "portraits/humans/lieutenant.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-400\n        [frame]\n            image=\"units/human-loyalists/lieutenant-crossbow.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS crossbow.ogg crossbow-miss.ogg -300}\n        [frame]\n            image=\"units/human-loyalists/lieutenant-crossbow-attack[1~2].png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-225\n        [frame]\n            image=\"units/human-loyalists/lieutenant.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/lieutenant-attack-sword-[1~3].png:[75,150,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Longbowman": {
    "id": "Longbowman",
    "image": "units/human-loyalists/longbowman.png",
    "profile": "portraits/humans/longbowman.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        start_time=-445\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"units/human-loyalists/longbowman-bow.png:65\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/longbowman-bow-attack-[1~4,1].png:[75*2,100,130,65]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -230}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-275\n\n        [frame]\n            image=\"units/human-loyalists/longbowman-melee-defend-1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/longbowman-melee-attack-[1~4].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-loyalists/longbowman-melee-defend-1.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Master at Arms": {
    "id": "Master at Arms",
    "image": "units/human-loyalists/master-at-arms.png",
    "profile": "portraits/humans/master-at-arms.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-600\n        [frame]\n            image=\"units/human-loyalists/master-at-arms-crossbow-[1,2].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS crossbow.ogg crossbow-miss.ogg -300}\n        [frame]\n            image=\"units/human-loyalists/master-at-arms-crossbow-[3~6,3~1].png:[100,200*2,100*4]\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=saber\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/human-loyalists/master-at-arms.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/master-at-arms-melee-2-[1,2].png:50\"\n        [/frame]\n        [if]\n            hits=no\n            [frame]\n                image=\"units/human-loyalists/master-at-arms-melee-3-3.png:150\"\n                sound={SOUND_LIST:MISS}\n            [/frame]\n        [/if]\n        [else]\n            hits=yes\n            [frame]\n                image=\"units/human-loyalists/master-at-arms-melee-1-3.png:150\"\n                sound={SOUND_LIST:SWORD_SWISH}\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/human-loyalists/master-at-arms-recover-[1,2].png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/master-at-arms.png:25\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=saber\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/human-loyalists/master-at-arms.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/master-at-arms-melee-2-[1,2].png:50\"\n        [/frame]\n        [if]\n            hits=no\n            [frame]\n                image=\"units/human-loyalists/master-at-arms-melee-2-3.png:150\"\n                sound={SOUND_LIST:MISS}\n            [/frame]\n        [/if]\n        [else]\n            hits=yes\n            [frame]\n                image=\"units/human-loyalists/master-at-arms-melee-1-3.png:150\"\n                sound={SOUND_LIST:SWORD_SWISH}\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/human-loyalists/master-at-arms-recover-[1,2].png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/master-at-arms.png:25\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=saber\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/human-loyalists/master-at-arms.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/master-at-arms-melee-1-[1~3].png:[50*2,150]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -75}\n        [frame]\n            image=\"units/human-loyalists/master-at-arms-recover-[1,2].png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/master-at-arms.png:25\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Master Bowman": {
    "id": "Master Bowman",
    "image": "units/human-loyalists/masterbowman.png",
    "profile": "portraits/humans/master-bowman.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        start_time=-445\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"units/human-loyalists/masterbowman-bow.png:65\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/masterbowman-bow-attack-[1~4,1].png:[75*2,100,130,65]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -230}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-275\n\n        [frame]\n            image=\"units/human-loyalists/masterbowman-melee-defend-1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/masterbowman-melee-attack-[1~4].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-loyalists/masterbowman-melee-defend-1.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Pikeman": {
    "id": "Pikeman",
    "image": "units/human-loyalists/pikeman.png",
    "profile": "portraits/humans/pikeman.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=pike\n        [/filter_attack]\n        direction=ne,nw\n        start_time=-250\n        [frame]\n            image=\"units/human-loyalists/pikeman.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -250}\n        [frame]\n            image=\"units/human-loyalists/pikeman-attack-ne.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/pikeman.png:75\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=pike\n        [/filter_attack]\n        direction=se,sw\n        start_time=-250\n        [frame]\n            image=\"units/human-loyalists/pikeman.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -250}\n        [frame]\n            image=\"units/human-loyalists/pikeman-attack-se.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/pikeman.png:75\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=pike\n        [/filter_attack]\n        direction=n\n        start_time=-250\n        [frame]\n            image=\"units/human-loyalists/pikeman.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/pikeman-attack-ne.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n        [frame]\n            image=\"units/human-loyalists/pikeman-attack-n.png:200\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/pikeman.png:75\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=pike\n        [/filter_attack]\n        direction=s\n        start_time=-250\n        [frame]\n            image=\"units/human-loyalists/pikeman.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/pikeman-attack-se.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n        [frame]\n            image=\"units/human-loyalists/pikeman-attack-s.png:200\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/pikeman.png:75\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Royal Guard": {
    "id": "Royal Guard",
    "image": "units/human-loyalists/royalguard.png",
    "profile": "portraits/humans/royal-guard.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-350\n        offset=0.0:200,0.0~0.65:180,0.65~0.0:250\n        [frame]\n            image=\"units/human-loyalists/royalguard-attack-sword[1~5].png:[90,90,100,100,130]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-loyalists/royalguard.png:120\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Sergeant": {
    "id": "Sergeant",
    "image": "units/human-loyalists/sergeant.png",
    "profile": "portraits/humans/sergeant.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-400\n        [frame]\n            image=\"units/human-loyalists/sergeant-crossbow.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS crossbow.ogg crossbow-miss.ogg -300}\n        [frame]\n            image=\"units/human-loyalists/sergeant-crossbow-attack[1~2].png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/human-loyalists/sergeant-attack-sword-[1~4].png:[75,150,100,75]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-loyalists/sergeant.png:25\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Shock Trooper": {
    "id": "Shock Trooper",
    "image": "units/human-loyalists/shocktrooper.png",
    "profile": "portraits/humans/iron-mauler.webp~RIGHT()",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=flail\n        [/filter_attack]\n        start_time=-260\n        {SOUND:HIT_AND_MISS flail.ogg flail-miss.ogg -260}\n        [frame]\n            image=\"units/human-loyalists/shocktrooper-attack-[1~6].png:[85,100,125,50*3]\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Spearman": {
    "id": "Spearman",
    "image": "units/human-loyalists/spearman.png",
    "profile": "portraits/humans/spearman.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=javelin\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n        start_time=-250\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-ranged1.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-ranged2.png:50\"\n            sound={SOUND_LIST:THROW}\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-[ranged2,ranged3].png:[50,100]\"\n        [/frame]\n        {SOUND:HIT spear.ogg 0}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        start_time=-325\n        direction=s\n        offset=\"0:180,0~0.5:145,0.5~0:200\"\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-se-1.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-s-[2,3].png:[100,75]\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-s-3.png~BLIT(units/human-loyalists/spearman-swoosh-s.png):50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-s-[3,2].png:[50,150]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        direction=n\n        start_time=-228\n        offset=\"0~0.4,0.4~0\"\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-n-[1~12].png:32\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -64}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        start_time=-325\n        direction=ne,nw\n        offset=\"0~-0.08:180,-0.08~0.5:145,0.5~0:200\"\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-n-1.png:80\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-ne-[1,2].png:[80,75]\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-ne-3.png~BLIT(units/human-loyalists/spearman-swoosh-ne.png):90\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-ne-[2,1].png:[70,130]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        start_time=-325\n        direction=se,sw\n        offset=\"0:180,0~0.5:145,0.5~0:200\"\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-se-[1,2,3].png:[100,100,75]\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-se-3.png~BLIT(units/human-loyalists/spearman-swoosh-se.png):50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/spearman-attack-se-[2,1].png:[120,80]\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/spearman.png:1\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/human-loyalists/spearman-stand-s-[1~7,6,7~2].png:200\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/human-loyalists/spearman-stand-n-[1~5,4,5,4,5~2].png:200\"\n            [/frame]\n        [/else]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        {WOUNDED_UNIT ()}\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/human-loyalists/spearman.png:400\"\n            [/frame]\n            [frame]\n                image=\"units/human-loyalists/spearman-bob-s-[1~3,2,1].png:[150*2,600,250*2]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/human-loyalists/spearman-n.png:400\"\n            [/frame]\n            [frame]\n                image=\"units/human-loyalists/spearman-bob-n-[1~3,2~1].png:[150*2,400,150*2]\"\n            [/frame]\n        [/else]\n    [/standing_anim]"
    ]
  },
  "Swordsman": {
    "id": "Swordsman",
    "image": "units/human-loyalists/swordsman.png",
    "profile": "portraits/humans/swordsman.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-600\n        offset=0.0:300,0.0~0.6:200,0.6:50,0.6~0.0:300\n        [frame]\n            image=\"units/human-loyalists/swordsman-attack-se-[1~8].png:[100*8]\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/swordsman.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -75}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-loyalists/swordsman.png:200\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        {WOUNDED_UNIT ()}\n        [frame]\n            image=\"units/human-loyalists/swordsman.png:900\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/swordsman-bob-s-[1~3,2,1].png:[180,120,600,250,350]\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Mage": {
    "id": "Mage",
    "image": "units/human-magi/mage.png",
    "profile": "portraits/humans/mage.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=missile\n        [/filter_attack]\n\n        offset=0\n\n        {MAGIC_MISSILE 11 -20}\n        {MAGIC_MISSILE_STAFF_FLARE -750 600 11 -20}\n\n        start_time=-800\n        [frame]\n            image=\"units/human-magi/mage-attack-magic[1,2,1].png:[100,700,200]\"\n        [/frame]\n        # wmlscope: start ignoring\n        {SOUND:HIT_AND_MISS magic-missile-[1~3].ogg magic-missile-[1~3]-miss.ogg -350}\n        # wmlscope: stop ignoring\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/human-magi/mage.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/mage-attack-staff[1~2].png:[100,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/human-magi/mage-attack-magic1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/mage.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=missile\n            [/filter_attack]\n            offset=0\n            {MAGIC_MISSILE 11 -20}\n            {MAGIC_MISSILE_STAFF_FLARE -750 600 11 -20}\n            [frame]\n                image=\"units/human-magi/mage+female-attack-magic[1,2,1].png:[100,700,200]\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=staff\n            [/filter_attack]\n            [frame]\n                image=\"units/human-magi/mage+female.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/mage+female-attack-staff[1~2].png:[100,200]\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/mage+female-attack-magic1.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/mage+female.png:50\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Arch Mage": {
    "id": "Arch Mage",
    "image": "units/human-magi/arch-mage.png",
    "profile": "portraits/humans/mage-arch.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fireball\n        [/filter_attack]\n        {MISSILE_FRAME_FIREBALL_XY 17 -22}\n        start_time=-575\n        [frame]\n            image=\"units/human-magi/arch-mage.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/arch-mage-attack-magic-1.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/arch-mage-attack-magic-[2,1].png:[150,75]\"\n            sound=fire.wav\n        [/frame]\n        [frame]\n            image=\"units/human-magi/arch-mage.png:75\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/human-magi/arch-mage.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/arch-mage-attack-staff-[1~2].png:[100,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/human-magi/arch-mage-attack-magic-1.png:75\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/arch-mage.png:75\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=fireball\n            [/filter_attack]\n            {MISSILE_FRAME_FIREBALL_XY 17 -22}\n            [frame]\n                image=\"units/human-magi/arch-mage+female.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/arch-mage+female-attack-magic-1.png:100\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/arch-mage+female-attack-magic-[2,1].png:[150,75]\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/arch-mage+female.png:75\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=staff\n            [/filter_attack]\n            [frame]\n                image=\"units/human-magi/arch-mage+female.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/arch-mage+female-attack-staff-[1~2].png:[100,200]\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/arch-mage+female-attack-magic-1.png:75\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/arch-mage+female.png:75\"\n            [/frame]\n        [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        {WOUNDED_UNIT ()}\n        start_time=0\n        [frame]\n            image=\"units/human-magi/arch-mage-standing-[1~10].png:[150*4,200,150*5]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/human-magi/arch-mage.png:200\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim] tags to override both male versions\n        #\n        [standing_anim]\n            {WOUNDED_UNIT ()}\n            start_time=0\n            [frame]\n                image=\"units/human-magi/arch-mage+female.png:200\"\n            [/frame]\n        [/standing_anim]",
      "[standing_anim]\n            start_time=0\n            [frame]\n                image=\"units/human-magi/arch-mage+female.png:200\"\n            [/frame]\n        [/standing_anim]"
    ]
  },
  "Elder Mage": {
    "id": "Elder Mage",
    "image": "units/human-magi/elder-mage.png",
    "profile": "portraits/humans/mage-arch.webp",
    "level": "5",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        start_time=-225\n        [frame]\n            image=\"units/human-magi/elder-mage-ranged1.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/elder-mage-melee[1~2].png:[100,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/human-magi/elder-mage-ranged1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/elder-mage.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=lightning\n        [/filter_attack]\n\n        {LIGHTNING_BOLT {DIRECTION_NUMBER} }\n\n        start_time=-300\n        {SOUND:HIT_AND_MISS lightning.ogg lightning-miss.ogg -300}\n        [frame]\n            image=\"units/human-magi/elder-mage-ranged[1~3,2,1].png:[100*2,200,100,50]\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Great Mage": {
    "id": "Great Mage",
    "image": "units/human-magi/great-mage.png",
    "profile": "portraits/humans/mage-arch.webp",
    "level": "4",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fireball\n        [/filter_attack]\n        {MISSILE_FRAME_FIREBALL_XY 18 -27}\n        start_time=-575\n        [frame]\n            image=\"units/human-magi/great-mage.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/great-mage-attack-magic-1.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/great-mage-attack-magic-[2,1].png:[150,75]\"\n            sound=fire.wav\n        [/frame]\n        [frame]\n            image=\"units/human-magi/great-mage.png:75\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/human-magi/great-mage.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/great-mage-attack-staff-[1~2].png:[100,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/human-magi/great-mage-attack-magic-1.png:75\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/great-mage.png:75\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=fireball\n            [/filter_attack]\n            {MISSILE_FRAME_FIREBALL_XY 18 -27}\n            [frame]\n                image=\"units/human-magi/great-mage+female.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/great-mage+female-attack-magic-1.png:100\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/great-mage+female-attack-magic-[2,1].png:[150,75]\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/great-mage+female.png:75\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=staff\n            [/filter_attack]\n            [frame]\n                image=\"units/human-magi/great-mage+female.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/great-mage+female-attack-staff-[1~2].png:[100,200]\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/great-mage+female-attack-magic-1.png:75\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/great-mage+female.png:75\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Mage of Light": {
    "id": "Mage of Light",
    "image": "units/human-magi/white-cleric.png",
    "profile": "portraits/humans/mage-light.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=lightbeam\n        [/filter_attack]\n        {MISSILE_FRAME_LIGHT_BEAM}\n\n        start_time=-395\n        [frame]\n            image=\"units/human-magi/white-cleric-magic-[1,2].png:75\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/white-cleric-magic-3.png\"\n            halo=halo/holy/halo[6,1,3,5,6].png:[75*4,50]\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:HOLY} {SOUND_LIST:HOLY_MISS} -75}\n        [frame]\n            image=\"units/human-magi/white-cleric-magic-[2,1].png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=flail\n        [/filter_attack]\n\n        start_time=-250\n        {SOUND:HIT_AND_MISS flail.ogg flail-miss.ogg -250}\n        [frame]\n            image=\"units/human-magi/white-cleric-magic-3.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/white-cleric-mace-[1~4].png:[100*4]\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=lightbeam\n            [/filter_attack]\n            {MISSILE_FRAME_LIGHT_BEAM}\n            [frame]\n                image=\"units/human-magi/white-cleric+female-magic-[1,2].png:75\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/white-cleric+female-magic-3.png\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/white-cleric+female-magic-[2,1].png:50\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=flail\n            [/filter_attack]\n            [frame]\n                image=\"units/human-magi/white-cleric+female-magic-3.png:100\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/white-cleric+female-mace-[1~4].png:[100*4]\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Red Mage": {
    "id": "Red Mage",
    "image": "units/human-magi/red-mage.png",
    "profile": "portraits/humans/mage-red.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fireball\n        [/filter_attack]\n        {MISSILE_FRAME_FIREBALL_XY 11 -20}\n\n        start_time=-575\n        [frame]\n            image=\"units/human-magi/red-mage.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/red-mage-attack-magic-1.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/red-mage-attack-magic-[2,1].png:[150,75]\"\n            sound=fire.wav\n        [/frame]\n        [frame]\n            image=\"units/human-magi/red-mage.png:75\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n\n        start_time=-250\n        [frame]\n            image=\"units/human-magi/red-mage.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/red-mage-attack-staff-[1~2].png:[100,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/human-magi/red-mage-attack-magic-1.png:75\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/red-mage.png:75\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=fireball\n            [/filter_attack]\n            {MISSILE_FRAME_FIREBALL_XY 11 -20}\n            [frame]\n                image=\"units/human-magi/red-mage+female.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/red-mage+female-attack-magic-1.png:100\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/red-mage+female-attack-magic-[2,1].png:[150,75]\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/red-mage+female.png:75\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=staff\n            [/filter_attack]\n            [frame]\n                image=\"units/human-magi/red-mage+female.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/red-mage+female-attack-staff-[1~2].png:[100,200]\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/red-mage+female-attack-magic-1.png:75\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/red-mage+female.png:75\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Silver Mage": {
    "id": "Silver Mage",
    "image": "units/human-magi/silver-mage.png",
    "profile": "portraits/humans/mage-silver.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=missile\n        [/filter_attack]\n\n        offset=0\n\n        {MAGIC_MISSILE 14 -23}\n        {MAGIC_MISSILE_STAFF_FLARE -750 600 14 -23}\n\n        start_time=-800\n        [frame]\n            image=\"units/human-magi/silver-mage-attack-magic[1,2,1].png:[100,700,200]\"\n        [/frame]\n        # wmlscope: start ignoring\n        {SOUND:HIT_AND_MISS magic-missile-[1~3].ogg magic-missile-[1~3]-miss.ogg -350}\n        # wmlscope: stop ignoring\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/human-magi/silver-mage.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/silver-mage-attack-staff[1~2].png:[100,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/human-magi/silver-mage-attack-magic1.png:75\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/silver-mage.png:75\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=missile\n            [/filter_attack]\n            offset=0\n            {MAGIC_MISSILE 14 -23}\n            {MAGIC_MISSILE_STAFF_FLARE -750 600 14 -23}\n            [frame]\n                image=\"units/human-magi/silver-mage+female-attack-magic[1,2,1].png:[100,700,200]\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=staff\n            [/filter_attack]\n            [frame]\n                image=\"units/human-magi/silver-mage+female.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/silver-mage+female-attack-staff[1~2].png:[100,200]\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/silver-mage+female-attack-magic1.png:75\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/silver-mage+female.png:75\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "White Mage": {
    "id": "White Mage",
    "image": "units/human-magi/white-mage.png",
    "profile": "portraits/humans/mage-white.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=lightbeam\n        [/filter_attack]\n        {MISSILE_FRAME_LIGHT_BEAM}\n\n        start_time=-395\n        [frame]\n            image=\"units/human-magi/white-mage-magic-[1,2].png:75\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/white-mage-magic-3.png\"\n            halo=halo/holy/halo[6,1,3,5,6].png:[75*4,50]\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:HOLY} {SOUND_LIST:HOLY_MISS} -75}\n        [frame]\n            image=\"units/human-magi/white-mage-magic-[2,1].png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        start_time=-325\n        [frame]\n            image=\"units/human-magi/white-mage.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/human-magi/white-mage-melee-[1~6].png:[100*2,150,100*3]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=lightbeam\n            [/filter_attack]\n            {MISSILE_FRAME_LIGHT_BEAM}\n            [frame]\n                image=\"units/human-magi/white-mage+female-magic-[1,2].png:75\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/white-mage+female-magic-3.png\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/white-mage+female-magic-[2,1].png:50\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=staff\n            [/filter_attack]\n            [frame]\n                image=\"units/human-magi/white-mage+female.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/human-magi/white-mage+female-melee-[1~6].png:[100*2,150,100*3]\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Outlaw": {
    "id": "Outlaw",
    "image": "units/human-outlaws/outlaw.png",
    "profile": "portraits/humans/outlaw.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sling\n        [/filter_attack]\n        start_time=-400\n        offset=0.0\n        [if]\n            hits=yes\n            {MISSILE_FRAME_STONE_HIT 5 -6}\n            [frame]\n                image=\"units/human-outlaws/outlaw-attack1.png:250\"\n                sound=sling.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            {MISSILE_FRAME_STONE_MISS 5 -6}\n            [frame]\n                image=\"units/human-outlaws/outlaw-attack1.png:250\"\n                sound=sling-miss.ogg\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/human-outlaws/outlaw-attack2.png:200\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=mace-spiked\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/human-outlaws/outlaw-melee-[1~3].png:[100,150,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=sling\n            [/filter_attack]\n            [if]\n                {MISSILE_FRAME_STONE_HIT 5 -6}\n                [frame]\n                    image=\"units/human-outlaws/outlaw+female-attack1.png:250\"\n                [/frame]\n            [/if]\n            [else]\n                {MISSILE_FRAME_STONE_MISS 5 -6}\n                [frame]\n                    image=\"units/human-outlaws/outlaw+female-attack1.png:250\"\n                [/frame]\n            [/else]\n            [frame]\n                image=\"units/human-outlaws/outlaw+female-attack2.png:200\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=mace-spiked\n            [/filter_attack]\n            [frame]\n                image=\"units/human-outlaws/outlaw+female-melee-[1~3].png:[100,150,100]\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Assassin": {
    "id": "Assassin",
    "image": "units/human-outlaws/assassin.png",
    "profile": "portraits/humans/assassin.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=throwing knives\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/dagger-n.png\"\n            image_diagonal=\"projectiles/dagger-ne.png\"\n        [/missile_frame]\n        start_time=-400\n        [frame]\n            image=\"units/human-outlaws/assassin-throwknife[1~2].png:[250,150]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS throwing-knife.ogg throwing-knife-miss.ogg -150}\n        [frame]\n            image=\"units/human-outlaws/assassin.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-225\n        [frame]\n            image=\"units/human-outlaws/assassin.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/assassin-melee-2-[1~2].png:[100,250]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-outlaws/assassin.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-225\n        [frame]\n            image=\"units/human-outlaws/assassin.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/assassin-melee-1-[1~2].png:[100,250]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-outlaws/assassin.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=throwing knives\n            [/filter_attack]\n            [frame]\n                image=\"units/human-outlaws/assassin+female-throwknife[1~2].png:[250,150]\"\n            [/frame]\n            [frame]\n                image=\"units/human-outlaws/assassin+female.png:100\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=dagger\n            [/filter_attack]\n            [frame]\n                image=\"units/human-outlaws/assassin+female.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/human-outlaws/assassin+female-melee-2-[1~2].png:[100,250]\"\n            [/frame]\n            [frame]\n                image=\"units/human-outlaws/assassin+female.png:50\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=dagger\n            [/filter_attack]\n            [frame]\n                image=\"units/human-outlaws/assassin+female.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/human-outlaws/assassin+female-melee-1-[1~2].png:[100,250]\"\n            [/frame]\n            [frame]\n                image=\"units/human-outlaws/assassin+female.png:50\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Bandit": {
    "id": "Bandit",
    "image": "units/human-outlaws/bandit.png",
    "profile": "portraits/humans/bandit.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace-spiked\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.6,0.6~0.4,0.4~0.0\n        start_time=-500\n        [frame]\n            image=\"units/human-outlaws/bandit-melee-[1~8].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n    [/attack_anim]"
    ]
  },
  "Footpad": {
    "id": "Footpad",
    "image": "units/human-outlaws/footpad.png",
    "profile": "portraits/humans/footpad.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sling\n        [/filter_attack]\n        offset=0.0\n        start_time=-400\n        [if]\n            hits=yes\n            {MISSILE_FRAME_STONE_HIT 5 -6}\n            [frame]\n                image=\"units/human-outlaws/footpad-attack1.png:250\"\n                sound=sling.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            {MISSILE_FRAME_STONE_MISS 5 -6}\n            [frame]\n                image=\"units/human-outlaws/footpad-attack1.png:250\"\n                sound=sling-miss.ogg\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/human-outlaws/footpad-attack2.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/footpad.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=club\n        [/filter_attack]\n        start_time=-300\n        offset=0.0:150,0.0~0.6:150,0.6~0.0:200\n        [frame]\n            image=\"units/human-outlaws/footpad-melee-[1~4].png:[80,90,130,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=sling\n            [/filter_attack]\n            [if]\n                {MISSILE_FRAME_STONE_HIT 5 -6}\n                [frame]\n                    image=\"units/human-outlaws/footpad+female-attack1.png:250\"\n                [/frame]\n            [/if]\n            [else]\n                {MISSILE_FRAME_STONE_MISS 5 -6}\n                [frame]\n                    image=\"units/human-outlaws/footpad+female-attack1.png:250\"\n                [/frame]\n            [/else]\n            [frame]\n                image=\"units/human-outlaws/footpad+female-attack2.png:100\"\n            [/frame]\n            [frame]\n                image=\"units/human-outlaws/footpad+female.png:100\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=club\n            [/filter_attack]\n            [frame]\n                image=\"units/human-outlaws/footpad+female-melee-[1~4].png:[80,90,130,200]\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Fugitive": {
    "id": "Fugitive",
    "image": "units/human-outlaws/fugitive.png",
    "profile": "portraits/humans/outlaw.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sling\n        [/filter_attack]\n        offset=0.0\n        start_time=-400\n        [if]\n            hits=yes\n            {MISSILE_FRAME_STONE_HIT 5 -6}\n            [frame]\n                image=\"units/human-outlaws/fugitive-ranged-1.png:250\"\n                sound=sling.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            {MISSILE_FRAME_STONE_MISS 5 -6}\n            [frame]\n                image=\"units/human-outlaws/fugitive-ranged-1.png:250\"\n                sound=sling-miss.ogg\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/human-outlaws/fugitive-ranged-2.png:200\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=mace-spiked\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/human-outlaws/fugitive-melee-[1~3].png:[100,150,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=sling\n            [/filter_attack]\n            [if]\n                {MISSILE_FRAME_STONE_HIT 5 -6}\n                [frame]\n                    image=\"units/human-outlaws/fugitive+female-ranged-1.png:250\"\n                [/frame]\n            [/if]\n            [else]\n                {MISSILE_FRAME_STONE_MISS 5 -6}\n                [frame]\n                    image=\"units/human-outlaws/fugitive+female-ranged-1.png:250\"\n                [/frame]\n            [/else]\n            [frame]\n                image=\"units/human-outlaws/fugitive+female-ranged-2.png:200\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=mace-spiked\n            [/filter_attack]\n            [frame]\n                image=\"units/human-outlaws/fugitive+female-melee-[1~3].png:[100,150,100]\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Highwayman": {
    "id": "Highwayman",
    "image": "units/human-outlaws/highwayman.png",
    "profile": "portraits/humans/bandit.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace-spiked\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.6,0.6~0.4,0.4~0.0\n        start_time=-500\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n        [frame]\n            image=\"units/human-outlaws/highwayman-melee-[1~8].png:100\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Rogue": {
    "id": "Rogue",
    "image": "units/human-outlaws/rogue.png",
    "profile": "portraits/humans/thief.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=throwing knives\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/dagger-n.png\"\n            image_diagonal=\"projectiles/dagger-ne.png\"\n        [/missile_frame]\n        start_time=-200\n        [frame]\n            image=\"units/human-outlaws/rogue.png:250\"\n        [/frame]\n        {SOUND:HIT_AND_MISS throwing-knife.ogg throwing-knife-miss.ogg -200}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/human-outlaws/rogue.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -150}\n        [frame]\n            image=\"units/human-outlaws/rogue.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/rogue.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=throwing knives\n            [/filter_attack]\n            [frame]\n                image=\"units/human-outlaws/rogue+female.png:250\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=dagger\n            [/filter_attack]\n            [frame]\n                image=\"units/human-outlaws/rogue+female.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/human-outlaws/rogue+female.png:250\"\n            [/frame]\n            [frame]\n                image=\"units/human-outlaws/rogue+female.png:100\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Ruffian": {
    "id": "Ruffian",
    "image": "units/human-peasants/ruffian.png",
    "profile": "portraits/humans/ruffian.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=club\n        [/filter_attack]\n        start_time=-600\n        offset=0.0:300,0.0~0.5:300,0.5~0.0:300\n        [frame]\n            image=\"units/human-peasants/ruffian-attack-[1~9].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n    [/attack_anim]"
    ]
  },
  "Thief": {
    "id": "Thief",
    "image": "units/human-outlaws/thief.png",
    "profile": "portraits/humans/thief.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-150\n        [frame]\n            image=\"units/human-outlaws/thief.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/thief-attack.png:200\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-outlaws/thief.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=dagger\n            [/filter_attack]\n            [frame]\n                image=\"units/human-outlaws/thief+female.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/human-outlaws/thief+female-attack.png:200\"\n            [/frame]\n            [frame]\n                image=\"units/human-outlaws/thief+female.png:50\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Thug": {
    "id": "Thug",
    "image": "units/human-outlaws/thug.png",
    "profile": "portraits/humans/thug.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=club\n        [/filter_attack]\n        offset=0.0~0.2,0.2~0.6,0.6~0.4,0.4~0.0\n        start_time=-500\n        [frame]\n            image=\"units/human-outlaws/thug-melee-[1~8].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n    [/attack_anim]"
    ]
  },
  "Peasant": {
    "id": "Peasant",
    "image": "units/human-peasants/peasant.png",
    "profile": "portraits/humans/peasant.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=pitchfork\n            range=ranged\n        [/filter_attack]\n        start_time=-350\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/pitchfork-n.png\"\n            image_diagonal=\"projectiles/pitchfork-ne.png\"\n        [/missile_frame]\n        start_time=-150\n        {SOUND:HIT spear.ogg -50}\n        [frame]\n            image=\"units/human-peasants/peasant-ranged[1,2].png:[150,350]\"\n            sound={SOUND_LIST:THROW}\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=pitchfork\n            range=melee\n        [/filter_attack]\n        direction=ne,se,sw,nw\n        start_time=-350\n        offset=0.0:150,0.0~0.5:200,0.5~0.0:200\n        [frame]\n            image=\"units/human-peasants/peasant-attack[1,2,3,4,5].png:[100,100,150,100,100]\"\n        [/frame]\n        [frame]\n            image=\"units/human-peasants/peasant.png:1\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -200}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=pitchfork\n            range=melee\n        [/filter_attack]\n        direction=s\n        start_time=-350\n        offset=0.0:150,0.0~0.5:200,0.5~0.0:200\n        [frame]\n            image=\"units/human-peasants/peasant-attack[1,2-s,3-s,4,5].png:[100,100,150,100,100]\"\n        [/frame]\n        [frame]\n            image=\"units/human-peasants/peasant.png:1\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -200}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=pitchfork\n            range=melee\n        [/filter_attack]\n        direction=n\n        start_time=-350\n        offset=0.0:150,0.0~0.5:200,0.5~0.0:200\n        [frame]\n            image=\"units/human-peasants/peasant-attack[1,2-n,3-n,4,5].png:[100,100,150,100,100]\"\n        [/frame]\n        [frame]\n            image=\"units/human-peasants/peasant.png:1\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -200}\n    [/attack_anim]"
    ]
  },
  "Royal Warrior": {
    "id": "Royal Warrior",
    "image": "units/human-loyalists/royal-warrior.png",
    "profile": "portraits/humans/royal-warrior.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/human-loyalists/royal-warrior.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-loyalists/royal-warrior-attack[1~2].png:[75,175]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n        [frame]\n            image=\"units/human-loyalists/royal-warrior.png:75\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Woodsman": {
    "id": "Woodsman",
    "image": "units/human-peasants/woodsman.png",
    "profile": "portraits/humans/woodsman.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        start_time=-445\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"units/human-peasants/woodsman-bow.png:65\"\n        [/frame]\n        [frame]\n            image=\"units/human-peasants/woodsman-bow-attack-[1~4,1].png:[75*2,100,130,65]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -230}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/human-peasants/woodsman.png:100\"\n        [/frame]\n        [if]\n            hits=yes\n            [frame]\n                image=\"units/human-peasants/woodsman-melee-1.png:200\"\n                sound=dagger-swish.wav\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [frame]\n                image=\"units/human-peasants/woodsman-melee-2.png:200\"\n                sound={SOUND_LIST:MISS}\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/human-peasants/woodsman.png:100\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Huntsman": {
    "id": "Huntsman",
    "image": "units/human-outlaws/huntsman.png",
    "profile": "portraits/humans/huntsman.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-400\n        [frame]\n            image=\"units/human-outlaws/huntsman-bow.png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -325}\n        [frame]\n            image=\"units/human-outlaws/huntsman-attack[1~3].png:[75,150,100]\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/huntsman-bow.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        hits=yes\n        start_time=-200\n        [frame]\n            image=\"units/human-outlaws/huntsman.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -150}\n        [frame]\n            image=\"units/human-outlaws/huntsman-attack-melee.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/huntsman.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Poacher": {
    "id": "Poacher",
    "image": "units/human-outlaws/poacher.png",
    "profile": "portraits/humans/trapper.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-550\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -150}\n        [frame]\n            image=\"units/human-outlaws/poacher-bow-attack[1~7].png:[50*4,200,50,100]\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/poacher-bow-attack1.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-220\n        [frame]\n            image=\"units/human-outlaws/poacher-dagger-defend1.png:70\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-outlaws/poacher-attack.png:180\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/poacher-dagger.png:250\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Ranger": {
    "id": "Ranger",
    "image": "units/human-outlaws/ranger.png",
    "profile": "portraits/humans/ranger.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-400\n        [frame]\n            image=\"units/human-outlaws/ranger-bow.png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -325}\n        [frame]\n            image=\"units/human-outlaws/ranger-bow-attack[1~4].png:[75,150,75*2]\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/ranger-bow.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        start_time=-275\n\n        [frame]\n            image=\"units/human-outlaws/ranger-sword-defend-1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/ranger-sword-attack[1~4].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/human-outlaws/ranger-sword-defend-1.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Trapper": {
    "id": "Trapper",
    "image": "units/human-outlaws/trapper.png",
    "profile": "portraits/humans/trapper.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-550\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -150}\n        [frame]\n            image=\"units/human-outlaws/trapper-bow-attack[1~7].png:[50*4,200,50,100]\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/trapper-bow-attack1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/trapper-bow.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/human-outlaws/trapper.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -150}\n        [frame]\n            image=\"units/human-outlaws/trapper.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/trapper.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/human-outlaws/trapper.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -150}\n        [frame]\n            image=\"units/human-outlaws/trapper.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/human-outlaws/trapper.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Merman Brawler": {
    "id": "Merman Brawler",
    "image": "units/merfolk/brawler.png",
    "profile": "portraits/merfolk/brawler.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fist-merman\n        [/filter_attack]\n        start_time=-300\n        [frame]\n            image=\"units/merfolk/brawler.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/brawler-fist-[1~3].png:[200,100*2]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS fist.ogg dagger-swish.wav -50}\n        [frame]\n            image=\"units/merfolk/brawler.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=tail-merman\n        [/filter_attack]\n        start_time=-140\n        {SOUND:HIT_AND_MISS fist.ogg dagger-swish.wav -50}\n        [frame]\n            image=\"units/merfolk/brawler-tail-land-[1,3,5~1].png:[30*2,80,30,80*3]\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/brawler.png:80\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Merman Citizen": {
    "id": "Merman Citizen",
    "image": "units/merfolk/citizen.png",
    "profile": "portraits/merfolk/brawler.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fist-merman\n        [/filter_attack]\n        start_time=-350\n\n        [frame]\n            image=units/merfolk/citizen-fist-[1~3].png:[250,150*2]\n        [/frame]\n        {SOUND:HIT_AND_MISS fist.ogg miss-1.ogg -100}\n        [frame]\n            image=units/merfolk/citizen.png:150\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Mermaid Diviner": {
    "id": "Mermaid Diviner",
    "image": "units/merfolk/diviner.png",
    "profile": "portraits/merfolk/priestess.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=lightbeam\n        [/filter_attack]\n        {MISSILE_FRAME_LIGHT_BEAM}\n\n        start_time=-250\n        [frame]\n            image=\"units/merfolk/diviner.png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:HOLY} {SOUND_LIST:HOLY_MISS} -175}\n        [frame]\n            image=\"units/merfolk/diviner.png:175\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/merfolk/diviner.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/merfolk/diviner.png:325\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Mermaid Enchantress": {
    "id": "Mermaid Enchantress",
    "image": "units/merfolk/enchantress.png",
    "profile": "portraits/merfolk/enchantress.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=water spray\n        [/filter_attack]\n        missile_start_time=-165\n        [missile_frame]\n            duration=165\n            image=\"projectiles/water-spray.png\"\n            image_diagonal=\"projectiles/water-spray.png\"\n        [/missile_frame]\n        start_time=-420\n\n        {MERMAID_WATER_BLAST_HALO}\n        {MERMAID_STAFF_FLARE 16 -12}\n\n        [frame]\n            image=\"units/merfolk/enchantress.png:300\" ### magic-1\n        [/frame]\n        [frame]\n            image=\"units/merfolk/enchantress.png:50\" ### magic-2\n            sound=water-blast.wav\n        [/frame]\n        [frame]\n            image=\"units/merfolk/enchantress.png:80\" ### magic-1\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/merfolk/enchantress.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/enchantress.png:[100,200]\" ### attack-1,2\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/merfolk/enchantress.png:50\" ### magic-1\n        [/frame]\n        [frame]\n            image=\"units/merfolk/enchantress.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Merman Entangler": {
    "id": "Merman Entangler",
    "image": "units/merfolk/entangler.png",
    "profile": "portraits/merfolk/netcaster.webp~CROP(20,0,400,400)~FL()",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=net\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            duration=200\n            image=\"projectiles/web.png\"\n            image_diagonal=\"projectiles/web.png\"\n        [/missile_frame]\n        start_time=-150\n        [frame]\n            image=\"units/merfolk/entangler.png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS net.wav {SOUND_LIST:MISS} -75}\n        [frame]\n            image=\"units/merfolk/entangler.png:175\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=club\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/merfolk/entangler.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/entangler.png:250\"\n        [/frame]\n        {SOUND:HIT_AND_MISS club.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Merman Fighter": {
    "id": "Merman Fighter",
    "image": "units/merfolk/fighter.png",
    "profile": "portraits/merfolk/fighter.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=trident\n        [/filter_attack]\n        offset=0~0.3,0.3~0\n        direction=se,sw\n        start_time=-225\n        [frame]\n            image=\"units/merfolk/fighter-attack-[1~6,2,1].png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -75}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=trident\n        [/filter_attack]\n        direction=n,ne,nw,s\n        start_time=-200\n        [frame]\n            image=\"units/merfolk/fighter.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -150}\n        [frame]\n            image=\"units/merfolk/fighter.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/fighter.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Merman Hoplite": {
    "id": "Merman Hoplite",
    "image": "units/merfolk/hoplite.png",
    "profile": "portraits/merfolk/hoplite.webp~FL()",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/merfolk/hoplite.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -150}\n        [frame]\n            image=\"units/merfolk/hoplite.png:200\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/hoplite.png:100\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Merman Hunter": {
    "id": "Merman Hunter",
    "image": "units/merfolk/hunter.png",
    "profile": "portraits/merfolk/hunter.webp~CROP(30,0,380,380)",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=ranged\n        [/filter_attack]\n        start_time=-760\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"units/merfolk/hunter-javelin-base.png:1\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/hunter-throw-[1~8].png:[100*2,120,220,120,100*3]\"\n        [/frame]\n\n        attack_sound_start_time=-220\n        [attack_sound_frame]\n            duration=120\n            sound={SOUND_LIST:THROW}\n        [/attack_sound_frame]\n        [if]\n            hits=yes\n            [attack_sound_frame]\n                sound=spear.ogg\n            [/attack_sound_frame]\n        [/if]\n\n        [frame]\n            image=\"units/merfolk/hunter-javelin-base.png:1\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/merfolk/hunter.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -150}\n        [frame]\n            image=\"units/merfolk/hunter.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/hunter.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Mermaid Initiate": {
    "id": "Mermaid Initiate",
    "image": "units/merfolk/initiate.png",
    "profile": "portraits/merfolk/initiate.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=water spray\n        [/filter_attack]\n        start_time=-420\n\n        missile_start_time=-165\n        [missile_frame]\n            duration=165\n            image=\"projectiles/water-spray.png\"\n            image_diagonal=\"projectiles/water-spray.png\"\n        [/missile_frame]\n        {MERMAID_WATER_BLAST_HALO}\n        {MERMAID_STAFF_FLARE 16 -12}\n\n        [frame]\n            image=\"units/merfolk/initiate-magic-[1,2].png:[70,230]\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/initiate-magic-2.png:50\"\n            sound=water-blast.wav\n        [/frame]\n        [frame]\n            image=\"units/merfolk/initiate-magic-1.png:80\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/merfolk/initiate.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/initiate-staff-attack-[1~2].png:[100,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/merfolk/initiate-magic-1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/initiate.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Merman Javelineer": {
    "id": "Merman Javelineer",
    "image": "units/merfolk/javelineer.png",
    "profile": "portraits/merfolk/spearman.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=ranged\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n        start_time=-200\n        [frame]\n            image=\"units/merfolk/javelineer.png:100\"\n            sound={SOUND_LIST:THROW}\n        [/frame]\n        {SOUND:HIT spear.ogg -100}\n        [frame]\n            image=\"units/merfolk/javelineer.png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/merfolk/javelineer.png:[100,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n        [frame]\n            image=\"units/merfolk/javelineer.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Merman Netcaster": {
    "id": "Merman Netcaster",
    "image": "units/merfolk/netcaster.png",
    "profile": "portraits/merfolk/netcaster.webp~CROP(20,0,400,400)~FL()",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=net\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            duration=200\n            image=\"projectiles/web.png\"\n            image_diagonal=\"projectiles/web.png\"\n        [/missile_frame]\n        start_time=-150\n        [if]\n            hits=yes\n            [frame]\n                image=\"units/merfolk/netcaster.png:75\"\n                sound=net.wav\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [frame]\n                image=\"units/merfolk/netcaster.png:75\"\n                sound={SOUND_LIST:MISS}\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/merfolk/netcaster.png:175\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=club\n        [/filter_attack]\n        [frame]\n            image=\"units/merfolk/netcaster.png:100\"\n        [/frame]\n        [if]\n            hits=yes\n            [frame]\n                image=\"units/merfolk/netcaster.png:250\"\n                sound=club.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [frame]\n                image=\"units/merfolk/netcaster.png:250\"\n                sound={SOUND_LIST:MISS}\n            [/frame]\n        [/else]\n    [/attack_anim]"
    ]
  },
  "Mermaid Priestess": {
    "id": "Mermaid Priestess",
    "image": "units/merfolk/priestess.png",
    "profile": "portraits/merfolk/priestess.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=lightbeam\n        [/filter_attack]\n        {MISSILE_FRAME_LIGHT_BEAM}\n\n        start_time=-250\n        [frame]\n            image=\"units/merfolk/priestess.png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:HOLY} {SOUND_LIST:HOLY_MISS} -175}\n        [frame]\n            image=\"units/merfolk/priestess.png:175\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/merfolk/priestess.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/merfolk/priestess.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/priestess.png:75\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Mermaid Siren": {
    "id": "Mermaid Siren",
    "image": "units/merfolk/siren.png",
    "profile": "portraits/merfolk/enchantress.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=water spray\n        [/filter_attack]\n        start_time=-420\n\n        missile_start_time=-165\n        [missile_frame]\n            duration=165\n            image=\"projectiles/water-spray.png\"\n            image_diagonal=\"projectiles/water-spray.png\"\n        [/missile_frame]\n        {MERMAID_WATER_BLAST_HALO}\n        {MERMAID_STAFF_FLARE 16 -12}\n\n        [frame]\n            image=\"units/merfolk/siren-magic-1.png:200\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/siren-magic-2.png:200\"\n            sound=water-blast.wav\n        [/frame]\n        [frame]\n            image=\"units/merfolk/siren-magic-1.png:120\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=naia touch\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/merfolk/siren.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/siren.png:[100,200]\" ### attack-1,2\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/merfolk/siren.png:50\" ### magic-1\n        [/frame]\n        [frame]\n            image=\"units/merfolk/siren.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Merman Spearman": {
    "id": "Merman Spearman",
    "image": "units/merfolk/spearman.png",
    "profile": "portraits/merfolk/spearman.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=ranged\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n        start_time=-200\n        [frame]\n            image=\"units/merfolk/spearman.png:100\"\n            sound={SOUND_LIST:THROW}\n        [/frame]\n        {SOUND:HIT spear.ogg -100}\n        [frame]\n            image=\"units/merfolk/spearman.png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/merfolk/spearman.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -150}\n        [frame]\n            image=\"units/merfolk/spearman.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/spearman.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Merman Triton": {
    "id": "Merman Triton",
    "image": "units/merfolk/triton.png",
    "profile": "portraits/merfolk/triton.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=trident\n            type=blade\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/merfolk/triton.png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/merfolk/triton.png:175\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/triton.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=trident\n            type=pierce\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/merfolk/triton.png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -125}\n        [frame]\n            image=\"units/merfolk/triton.png:175\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/triton.png:100\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Merman Warrior": {
    "id": "Merman Warrior",
    "image": "units/merfolk/warrior.png",
    "profile": "portraits/merfolk/fighter.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=trident\n        [/filter_attack]\n        offset=0~0.3,0.3~0\n        direction=se,sw\n        start_time=-450\n        [frame]\n            image=\"units/merfolk/warrior-attack-[1~9].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=trident\n        [/filter_attack]\n        direction=n,ne,nw,s\n        start_time=-200\n        [frame]\n            image=\"units/merfolk/warrior.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -150}\n        [frame]\n            image=\"units/merfolk/warrior.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/merfolk/warrior.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Giant Ant": {
    "id": "Giant Ant",
    "image": "units/monsters/ant/ant.png",
    "profile": "portraits/monsters/ant-giant.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        start_time=-100\n        [frame]\n            image=units/monsters/ant/ant-attack.png:200\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Giant Ant Egg": {
    "id": "Giant Ant Egg",
    "image": "units/monsters/ant/ant_egg.png",
    "profile": "portraits/monsters/ant-egg.webp",
    "level": "0",
    "standing_anim": [
      "[standing_anim]\n        start_time=-50\n        [frame]\n            image=\"misc/blank-hex.png:50\"\n        [/frame]\n        [egg_frame]\n            image=\"units/monsters/ant/ant_egg.png:50\"\n            auto_vflip=no\n            auto_hflip=no\n        [/egg_frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=-50\n        [frame]\n            image=\"misc/blank-hex.png:50\"\n        [/frame]\n        [egg_frame]\n            image=\"units/monsters/ant/ant_red-egg.png:50\"\n            auto_vflip=no\n            auto_hflip=no\n        [/egg_frame]\n    [/standing_anim]"
    ]
  },
  "Fire Ant": {
    "id": "Fire Ant",
    "image": "units/monsters/ant/fire-ant.png",
    "profile": "portraits/monsters/ant-fire.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        start_time=-100\n        [frame]\n            image={PATH_TEMP}fire-ant.png:200\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fire\n        [/filter_attack]\n        start_time=-100\n        {MISSILE_FRAME_FIRE_BREATH (0,4~-32) (0,-4~32) (0~24,4~-32) (0~24,-4~32) IPF=\"~SCALE_INTO_SHARP(42,42)\"}\n        [frame]\n            image={PATH_TEMP}fire-ant.png:200\n        [/frame]\n        {SOUND:HIT_AND_MISS fire.wav {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        flame_start_time=0\n        [flame_frame]\n            halo={PATH_TEMP}fire-ant-glow.png~O(0.7):960\n            image={PATH_TEMP}fire-ant-flame[1~12].png:[80*12]\n            auto_vflip=no\n            layer=11\n            directional_x=3\n            halo_x,halo_y=4,1\n        [/flame_frame]\n        [frame]\n            image={PATH_TEMP}fire-ant.png:960\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"{STATIC_IMAGE_TEMP}\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Firebane Ant": {
    "id": "Firebane Ant",
    "image": "units/monsters/ant/firebane-ant.png",
    "profile": "portraits/monsters/ant-firebane.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        start_time=-100\n        [frame]\n            image={PATH_TEMP}firebane-ant.png:200\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fire\n        [/filter_attack]\n        start_time=-100\n        {MISSILE_FRAME_FIRE_BREATH (0,4~-32) (0,-4~32) (0~24,4~-32) (0~24,-4~32) IPF=\"~SCALE_INTO_SHARP(60,60)\"}\n        [frame]\n            image={PATH_TEMP}firebane-ant.png:200\n        [/frame]\n        {SOUND:HIT_AND_MISS fire.wav {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        flame_start_time=0\n        [flame_frame]\n            halo={PATH_TEMP}fire-ant-glow.png~O(0.7):960\n            image={PATH_TEMP}fire-ant-flame[1~12].png:[80*12]\n            auto_vflip=no\n            layer=11\n        [/flame_frame]\n        [frame]\n            image={PATH_TEMP}firebane-ant.png:960\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"{STATIC_IMAGE_TEMP}\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Firebomb Ant": {
    "id": "Firebomb Ant",
    "image": "units/monsters/ant/firebomb-ant.png",
    "profile": "portraits/monsters/ant-firebomb.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        start_time=-100\n        [frame]\n            image={PATH_TEMP}firebomb-ant.png:200\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fire\n        [/filter_attack]\n        start_time=-100\n        {MISSILE_FRAME_FIRE_BREATH (0,4~-32) (0,-4~32) (0~24,4~-32) (0~24,-4~32) IPF=\"~SCALE_INTO_SHARP(60,60)\"}\n        [frame]\n            image={PATH_TEMP}firebomb-ant.png:200\n        [/frame]\n        {SOUND:HIT_AND_MISS fire.wav {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        flame_start_time=0\n        [flame_frame]\n            halo={PATH_TEMP}fire-ant-glow.png~O(0.7):960\n            image={PATH_TEMP}fire-ant-flame[1~12].png:[80*12]\n            halo_x,halo_y=-2,-1\n            directional_x=-2\n            auto_vflip=no\n            layer=11\n        [/flame_frame]\n        [frame]\n            image={PATH_TEMP}firebomb-ant.png:960\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"{STATIC_IMAGE_TEMP}\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Fire Ant Queen": {
    "id": "Fire Ant Queen",
    "image": "units/monsters/ant/fire-queen.png",
    "profile": "portraits/monsters/ant-fire-queen.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        start_time=-100\n        [frame]\n            image={PATH_TEMP}fire-queen.png:200\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fire\n        [/filter_attack]\n        start_time=-100\n        {MISSILE_FRAME_FIRE_BREATH (0,4~-32) (0,-4~32) (0~24,4~-32) (0~24,-4~32) IPF=\"~SCALE_INTO_SHARP(72,72)\"}\n        [frame]\n            image={PATH_TEMP}fire-queen.png:200\n        [/frame]\n        {SOUND:HIT_AND_MISS fire.wav {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        flame_start_time=0\n        [flame_frame]\n            halo={PATH_TEMP}fire-ant-glow.png~O(0.7):960\n            image={PATH_TEMP}fire-ant-flame[1~12].png:[80*12]\n            directional_x=-7\n            halo_x=-7\n            auto_vflip=no\n            layer=11\n        [/flame_frame]\n        [frame]\n            image={PATH_TEMP}fire-queen.png:960\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"{STATIC_IMAGE_TEMP}\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Giant Ant Queen": {
    "id": "Giant Ant Queen",
    "image": "units/monsters/ant/queen.png",
    "profile": "portraits/monsters/ant-queen.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        start_time=-350\n        offset=0.0~-0.05:180,-0.05~0.6:170,0.6~0.0:250\n        [frame]\n            image=units/monsters/ant/queen-attack[1,2].png:[220,160]\n        [/frame]\n        [frame]\n            image=units/monsters/ant/queen.png:170\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Soldier Ant": {
    "id": "Soldier Ant",
    "image": "units/monsters/ant/soldier.png",
    "profile": "portraits/monsters/ant-soldier.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        start_time=-100\n        [frame]\n            image=units/monsters/ant/soldier-attack.png:200\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Cave Bear": {
    "id": "Cave Bear",
    "image": "units/monsters/bear/bear.png",
    "profile": "portraits/monsters/bear.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        start_time=-650\n        offset=0.0:400,0.0~0.6:250,0.6~0.0:400\n        [frame]\n            image=units/monsters/bear/bear-bite[1~6].png:[150,200,150,150,170,230]\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n        start_time=-400\n        offset=0.0:200,0.0~0.6:200,0.6~0.0:300\n        [frame]\n            image=units/monsters/bear/bear-claws[1~6].png:[100*6]\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n        start_time=-400\n        offset=0.0:350,0.0~0.6:170,0.6~0.0:280\n        [frame]\n            image=units/monsters/bear/bear-2claws[1~8].png:[100*8]\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=-50\n        [frame]\n            image=\"units/monsters/bear/bear.png:50\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=-50\n        terrain_type=!,*^B*,Cme*^*,Kme*^*,Wwr*^*,Wwf*^*,!,Chs*^*,Chw*^*,Cm*^*,Km*^*,W*^*,S*^*,*^Vm\n        [frame]\n            image=\"units/monsters/bear/bear-water.png:50\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Woodland Boar": {
    "id": "Woodland Boar",
    "image": "units/monsters/boar/woodland.png",
    "profile": "portraits/monsters/woodland_boar.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        start_time=-390\n        offset=0.0:220,0.0~0.6:170,0.6~0.0240\n        [frame]\n            image=\"units/monsters/boar/woodland-bite[1~7].png:[60*5,90,120]\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/boar/woodland.png:120\"\n        [/frame]\n        {SOUND:HIT bite.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=tusk\n        [/filter_attack]\n        start_time=-600\n        dust_start_time=-600\n        dust_offset=0.0\n        offset=0.0~-0.05:210,-0.05~0.05:210,0.05~0.8:180,0.8~0.0:230\n        [dust_frame]\n            image=\"units/monsters/boar/woodland-dust[1~5].png:[120*5],units/monsters/boar/woodland-dust1.png~O(0%):1\"\n            layer=1\n            auto_vflip=no\n        [/dust_frame]\n        [frame]\n            image=\"units/monsters/boar/woodland-charge[1~3,2,1~4,5].png:[70*7,110,230]\"\n            layer=2\n        [/frame]\n        {SOUND:HIT_AND_MISS tusker-charge.ogg tusker-charge-miss.ogg -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=-50\n        [frame]\n            image=\"units/monsters/boar/woodland.png\"\n            duration=50\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=-50\n        terrain_type=!,*^B*,Cme*^*,Kme*^*,Wwr*^*,Wwf*^*,!,Chs*^*,Chw*^*,Cm*^*,Km*^*,W*^*,S*^*,*^Vm\n        [frame]\n            image=\"units/monsters/boar/woodland-water.png\"\n            duration=50\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        [frame]\n            begin=0\n            end=150\n            image=\"units/monsters/boar/woodland-moving.png\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Piglet": {
    "id": "Piglet",
    "image": "units/monsters/boar/piglet.png",
    "profile": "portraits/monsters/piglet.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        start_time=-250\n        offset=0.0~-0.05:80,-0.05~0.6:170,0.6~0.0:260\n        [frame]\n            image=\"units/monsters/boar/piglet-attack[1,2].png:[100,150]\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/boar/piglet-moving2.png:150\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/boar/piglet.png:1\"\n        [/frame]\n        {SOUND:HIT bite-small.ogg -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=-50\n        [frame]\n            image=\"units/monsters/boar/piglet.png\"\n            duration=50\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=-50\n        terrain_type=!,*^B*,Cme*^*,Kme*^*,Wwr*^*,Wwf*^*,!,Chs*^*,Chw*^*,Cm*^*,Km*^*,W*^*,S*^*,*^Vm\n        [frame]\n            image=\"units/monsters/boar/piglet-water.png\"\n            duration=50\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        y=0~3:37,3~-3:76,-3~0:37\n        [frame]\n            image=\"units/monsters/boar/piglet-moving[1,2].png:[75*2]\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Caribe": {
    "id": "Caribe",
    "image": "units/monsters/caribe/caribe.png",
    "profile": "portraits/monsters/caribe.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        terrain_type=W*,W*^Wkf\n        start_time=-250\n        offset=0~-0.1:75,-0.1~0.65:175,0.65~0:250\n        [frame]\n            image={CARIBE_IMAGE_PATH}/caribe-small-[default,attack-1,attack-2,default].png~MASK({CARIBE_IMAGE_PATH}/caribe-mask.png):[50,125,150,175]\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        terrain_type=!,W*,W*^Wkf\n        start_time=-250\n        offset=0~-0.1:75,-0.1~0.65:175,0.65~0:250\n        [frame]\n            image={CARIBE_IMAGE_PATH}/caribe-small-[land,attack-1,attack-2,land].png:[50,125,150,175]\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        fish_start_time=0\n        fish_y=1:250,1~3:600,3:150,3~1:600\n        terrain_type=W*,W*^Wkf\n        alpha=0.3\n        [fish_frame]\n            image={CARIBE_IMAGE_PATH}/caribe-small-[hi,default,lo,default].png~MASK({CARIBE_IMAGE_PATH}/caribe-mask.png):[400*4]\n            auto_vflip=no\n            # submerge=0.45\n            primary=yes\n        [/fish_frame]\n        [frame]\n            image={CARIBE_IMAGE_PATH}/caribe-shadow.png:1600\n            layer=2\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        terrain_type=!,W*,W*^Wkf\n        [frame]\n            image={CARIBE_IMAGE_PATH}/caribe-small-land.png\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        fish_start_time=0\n        fish_y=1:250,1~3:600,3:150,3~1:600\n        fish_offset=\"0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200\"\n        terrain_type=W*,W*^Wkf\n        alpha=0.3\n        [fish_frame]\n            image={CARIBE_IMAGE_PATH}/caribe-small-[hi,default,lo,default].png~MASK({CARIBE_IMAGE_PATH}/caribe-mask.png):[400*4]\n            auto_vflip=no\n            # submerge=0.45\n            primary=yes\n        [/fish_frame]\n        [frame]\n            image={CARIBE_IMAGE_PATH}/caribe-shadow.png:1600\n            layer=2\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        start_time=0\n        terrain_type=!,W*,W*^Wkf\n        [frame]\n            image={CARIBE_IMAGE_PATH}/caribe-small-land.png\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Hunter Caribe": {
    "id": "Hunter Caribe",
    "image": "units/monsters/caribe/caribe.png",
    "profile": "portraits/monsters/caribe-hunter.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        terrain_type=W*,W*^Wkf\n        start_time=-350\n        offset=0~-0.1:175,-0.1~0.65:175,0.65~0:250\n        [frame]\n            image={CARIBE_IMAGE_PATH}/caribe-[attack-2,attack-1,attack-2,attack-3,default].png~MASK({CARIBE_IMAGE_PATH}/caribe-mask.png):[70,80,125,150,175]\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        terrain_type=!,W*,W*^Wkf\n        start_time=-325\n        offset=0~-0.1:150,-0.1~0.65:175,0.65~0:250\n        [frame]\n            image={CARIBE_IMAGE_PATH}/caribe-[attack-2,attack-1,attack-2,attack-3,land].png:[60,65,125,150,175]\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=kelp\n        [/filter_attack]\n        start_time=-450\n        missile_start_time=-200\n        offset=0.0~-0.05:300,-0.05~0.05:200,0.05~0.0:120\n        y=0:300,0~-5:150,-5~0:170\n        missile_y=0~-4:80,-4:40,-4~0:80\n        [missile_frame]\n            duration=200\n            image=\"projectiles/kelp.png\"\n            image_diagonal=\"projectiles/kelp.png\"\n        [/missile_frame]\n        [frame]\n            image={CARIBE_IMAGE_PATH}/caribe-sling[1~5].png:[100*3,200,120]\n        [/frame]\n        {SOUND:HIT_AND_MISS entangle.wav {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        fish_start_time=0\n        fish_y=1:250,1~3:600,3:150,3~1:600\n        terrain_type=W*,W*^Wkf\n        alpha=0.3\n        [fish_frame]\n            image={CARIBE_IMAGE_PATH}/caribe-[hi,default,lo,default].png~MASK({CARIBE_IMAGE_PATH}/caribe-mask.png):[400*4]\n            auto_vflip=no\n            # submerge=0.45\n            primary=yes\n        [/fish_frame]\n        [frame]\n            image={CARIBE_IMAGE_PATH}/caribe-shadow.png:1600\n            layer=2\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        terrain_type=!,W*,W*^Wkf\n        [frame]\n            image={CARIBE_IMAGE_PATH}/caribe-land.png\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        fish_start_time=0\n        fish_y=1:250,1~3:600,3:150,3~1:600\n        fish_offset=\"0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200\"\n        terrain_type=W*,W*^Wkf\n        alpha=0.3\n        [fish_frame]\n            image={CARIBE_IMAGE_PATH}/caribe-[hi,default,lo,default].png~MASK({CARIBE_IMAGE_PATH}/caribe-mask.png):[400*4]\n            auto_vflip=no\n            # submerge=0.45\n            primary=yes\n        [/fish_frame]\n        [frame]\n            image={CARIBE_IMAGE_PATH}/caribe-shadow.png:1600\n            layer=2\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        start_time=0\n        terrain_type=!,W*,W*^Wkf\n        [frame]\n            image={CARIBE_IMAGE_PATH}/caribe-land.png\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Nibbler": {
    "id": "Nibbler",
    "image": "units/monsters/caribe/nibbler.png",
    "profile": "portraits/monsters/nibbler.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        terrain_type=W*,W*^Wkf\n        # place holder anim\n        start_time=-225\n        offset=0~-0.1:75,-0.1~0.65:150,0.65~0:225\n        [frame]\n            image={CARIBE_IMAGE_PATH}/nibbler-[default,attack-1,default].png~MASK({CARIBE_IMAGE_PATH}/caribe-mask.png):[50,200,200]\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        terrain_type=!,W*,W*^Wkf\n        # place holder anim\n        start_time=-225\n        offset=0~-0.1:75,-0.1~0.65:150,0.65~0:225\n        [frame]\n            image={CARIBE_IMAGE_PATH}/nibbler-[land,attack-1,land].png:[50,200,200]\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        fish_start_time=0\n        fish_y=1:250,1~3:600,3:150,3~1:600\n        terrain_type=W*,W*^Wkf\n        alpha=0.3\n        [fish_frame]\n            image={CARIBE_IMAGE_PATH}/nibbler-[hi,default,lo,default].png~MASK({CARIBE_IMAGE_PATH}/caribe-mask.png):[400*4]\n            auto_vflip=no\n            # submerge=0.45\n            primary=yes\n        [/fish_frame]\n        [frame]\n            image={CARIBE_IMAGE_PATH}/nibbler-shadow.png:1600\n            layer=2\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        terrain_type=!,W*,W*^Wkf\n        [frame]\n            image={CARIBE_IMAGE_PATH}/nibbler-land.png\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        fish_start_time=0\n        fish_y=1:250,1~3:600,3:150,3~1:600\n        fish_offset=\"0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200\"\n        terrain_type=W*,W*^Wkf\n        alpha=0.3\n        [fish_frame]\n            image={CARIBE_IMAGE_PATH}/nibbler-[hi,default,lo,default].png~MASK({CARIBE_IMAGE_PATH}/caribe-mask.png):[400*4]\n            auto_vflip=no\n            # submerge=0.45\n            primary=yes\n        [/fish_frame]\n        [frame]\n            image={CARIBE_IMAGE_PATH}/nibbler-shadow.png:1600\n            layer=2\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        start_time=0\n        terrain_type=!,W*,W*^Wkf\n        [frame]\n            image={CARIBE_IMAGE_PATH}/nibbler-land.png\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Swamp Lizard": {
    "id": "Swamp Lizard",
    "image": "units/monsters/croc/crocodile.png",
    "profile": "portraits/monsters/crocodile.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        {CROC_TERRAIN_FILTER_TEMP}\n        start_time=-450\n        offset=0.0:300,0.0~0.6:150,0.6~0.0:400\n        [if]\n            direction=n,nw,ne\n            [frame] # this eventually needs a NE attack anim, but it doesn't look _that_ egregious as is, unlike the non-floating\n                image=units/monsters/croc/crocodile-float-attack[1~6].png:[100,100,100,100,150,300]\n            [/frame]\n        [/if]\n        [else]\n            [frame]\n                image=units/monsters/croc/crocodile-float-attack[1~6].png:[100,100,100,100,150,300]\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        start_time=-500\n        [if]\n            direction=n,nw,ne\n            offset=0.0:400,0.0~0.7:100,0.7:150,0.7~0.0:250\n            [frame]\n                image=units/monsters/croc/crocodile-ne-attack[1~6].png:[70,100,120,160,100,350]\n            [/frame]\n        [/if]\n        [else]\n            offset=0.0:350,0.0~0.6:150,0.6~0.0:400\n            [frame]\n                image=units/monsters/croc/crocodile-attack[1~7].png:[100*5,150,250]\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=-50\n        tail_start_time=-50\n        direction=s,sw,se\n        terrain_type=!,{CROC_TERRAIN_TEMP}\n        [filter]\n            [filter_adjacent]\n                adjacent=ne,nw\n            [/filter_adjacent]\n        [/filter]\n        [frame]\n            image=\"units/monsters/croc/crocodile-no-tail.png:50\"\n        [/frame]\n        [tail_frame]\n            image=\"units/monsters/croc/crocodile-tail.png:50\"\n            layer=-1 # so the tail doesn't get on top of other sprites to the north\n            auto_vflip=no\n            auto_hflip=yes\n        [/tail_frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=-50\n        [if]\n            direction=n,nw,ne\n            [frame]\n                image=\"units/monsters/croc/crocodile-ne.png:50\"\n            [/frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"units/monsters/croc/crocodile.png:50\"\n            [/frame]\n        [/else]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=-50\n        {CROC_TERRAIN_FILTER_TEMP}\n        [if]\n            direction=n,nw,ne\n            submerge=0.42\n            [frame]\n                image=\"units/monsters/croc/crocodile-float-ne.png:50\"\n            [/frame]\n        [/if]\n        [else]\n            submerge=0.45\n            [frame]\n                image=\"units/monsters/croc/crocodile-float.png:50\"\n            [/frame]\n        [/else]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        direction=s,sw,se\n        [if]\n            direction=n,nw,ne\n            [frame]\n                image=\"units/monsters/croc/crocodile-ne.png:50\"\n            [/frame]\n        [/if]\n        [else]\n            [frame]\n                image=\"units/monsters/croc/crocodile.png:50\"\n            [/frame]\n        [/else]\n    [/movement_anim]",
      "[movement_anim]\n        start_time=0\n        {CROC_TERRAIN_FILTER_TEMP}\n        [if]\n            direction=n,nw,ne\n            submerge=0.42\n            [frame]\n                image=\"units/monsters/croc/crocodile-float-ne.png:50\"\n            [/frame]\n        [/if]\n        [else]\n            submerge=0.45\n            [frame]\n                image=\"units/monsters/croc/crocodile-float.png:50\"\n            [/frame]\n        [/else]\n    [/movement_anim]"
    ]
  },
  "Cuttle Fish": {
    "id": "Cuttle Fish",
    "image": "units/monsters/cuttlefish.png",
    "profile": "portraits/monsters/cuttlefish.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=ink\n        [/filter_attack]\n        start_time=-500\n        missile_start_time=-300\n        [missile_frame]\n            duration=300\n            image=\"projectiles/ink.png\"\n            image_diagonal=\"projectiles/ink.png\"\n        [/missile_frame]\n        [frame]\n            image=\"units/monsters/cuttlefish-ranged-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS ink.ogg ink-miss.ogg -500}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=tentacle\n        [/filter_attack]\n        start_time=-400\n        offset=0.0~-0.05:200,-0.05~0.6:150,0.6~0.0:250\n        [frame]\n            image=\"units/monsters/cuttlefish-melee-[1~6].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} 0}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=tentacle\n        [/filter_attack]\n        start_time=-400\n        offset=0.0~-0.05:320,-0.05~0.6:100,0.6~0.0:180\n        [frame]\n            image=\"units/monsters/cuttlefish-melee-a[1~5].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS squishy-hit.wav {SOUND_LIST:MISS} 0}\n    [/attack_anim]"
    ]
  },
  "Dragonfly": {
    "id": "Dragonfly",
    "image": "units/monsters/dragonfly/young/dragonfly.png",
    "profile": "portraits/monsters/dragonfly.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        start_time=-200\n        offset=0.0~0.65:150,0.65~0.0:200\n        [if]\n            direction=se,s,sw\n            [frame]\n                image=\"units/monsters/dragonfly/young/dragonfly.png:350\"\n                #    image=\"units/monsters/dragonfly/young/dragonfly-melee[1~3].png:[250,100,150]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=ne,n,nw\n            [frame]\n                image=\"units/monsters/dragonfly/young/dragonfly-n.png:350\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS bite.ogg spear-miss.ogg -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        direction=se,s,sw\n        bug_start_time=0\n        bug_y=-4~0:300,0~-4:300\n        [frame]\n            image=\"units/monsters/dragonfly/young/dragonfly-shadow.png:200\"\n        [/frame]\n        [bug_frame]\n            image=\"units/monsters/dragonfly/young/dragonfly-flying[1,2,1,2,1,2,1,2,1,2,1,2].png:50\"\n            auto_vflip=no\n            primary=yes\n        [/bug_frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        direction=nw,n,ne\n        bug_start_time=0\n        bug_y=-4~0:300,0~-4:300\n        [frame]\n            image=\"units/monsters/dragonfly/young/dragonfly-n-shadow.png:200\"\n        [/frame]\n        [bug_frame]\n            image=\"units/monsters/dragonfly/young/dragonfly-n-flying[1,2,1,2,1,2,1,2,1,2,1,2].png:50\"\n            auto_vflip=no\n            primary=yes\n        [/bug_frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        bug_start_time=0\n        bug_offset=\"0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200\"\n        [if]\n            direction=se,s,sw\n            [frame]\n                image=\"units/monsters/dragonfly/young/dragonfly-shadow.png:160\"\n            [/frame]\n            [bug_frame]\n                image=\"units/monsters/dragonfly/young/dragonfly-flying[1,2].png:80\"\n                auto_vflip=no\n                primary=yes\n            [/bug_frame]\n        [/if]\n        [else]\n            direction=ne,n,nw\n            [frame]\n                image=\"units/monsters/dragonfly/young/dragonfly-n-shadow.png:160\"\n            [/frame]\n            [bug_frame]\n                image=\"units/monsters/dragonfly/young/dragonfly-n-flying[1,2].png:80\"\n                auto_vflip=no\n                primary=yes\n            [/bug_frame]\n        [/else]\n    [/movement_anim]"
    ]
  },
  "Grand Dragonfly": {
    "id": "Grand Dragonfly",
    "image": "units/monsters/dragonfly/grand/dragonfly.png",
    "profile": "portraits/monsters/dragonfly.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sting\n        [/filter_attack]\n        direction=ne,n,nw\n        start_time=-200\n        offset=0.0~-0.05:50,-0.05~0.65:150,0.65~0.0:200\n        [frame]\n            image=\"units/monsters/dragonfly/grand/dragonfly-n.png:[400]\"\n            #            image=\"units/monsters/dragonfly/grand/dragonfly-sting[1~3].png:[250,100,150]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        direction=ne,n,nw\n        start_time=-150\n        offset=0.0~0.65:150,0.65~0.0:200\n        [frame]\n            image=\"units/monsters/dragonfly/grand/dragonfly-n.png:[350]\"\n            #            image=\"units/monsters/dragonfly/grand/dragonfly-melee[1~3].png:[250,100,150]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sting\n        [/filter_attack]\n        direction=se,s,sw\n        start_time=-200\n        offset=0.0~-0.05:50,-0.05~0.65:150,0.65~0.0:200\n        [frame]\n            image=\"units/monsters/dragonfly/grand/dragonfly.png:[400]\"\n            #            image=\"units/monsters/dragonfly/grand/dragonfly-sting[1~3].png:[250,100,150]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        direction=se,s,sw\n        start_time=-150\n        offset=0.0~0.65:150,0.65~0.0:200\n        [frame]\n            image=\"units/monsters/dragonfly/grand/dragonfly.png:[350]\"\n            #            image=\"units/monsters/dragonfly/grand/dragonfly-melee[1~3].png:[250,100,150]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg spear-miss.ogg -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        direction=se,s,sw\n        bug_start_time=0\n        bug_y=-4~0:300,0~-4:300\n        [frame]\n            image=\"units/monsters/dragonfly/grand/dragonfly-shadow.png:200\"\n        [/frame]\n        [bug_frame]\n            image=\"units/monsters/dragonfly/grand/dragonfly-flying[1,2,1,2,1,2,1,2,1,2,1,2].png:50\"\n            auto_vflip=no\n            primary=yes\n        [/bug_frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        direction=ne,n,nw\n        bug_start_time=0\n        bug_y=-4~0:300,0~-4:300\n        [frame]\n            image=\"units/monsters/dragonfly/grand/dragonfly-n-shadow.png:200\"\n        [/frame]\n        [bug_frame]\n            image=\"units/monsters/dragonfly/grand/dragonfly-n-flying[1,2,1,2,1,2,1,2,1,2,1,2].png:50\"\n            auto_vflip=no\n            primary=yes\n        [/bug_frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        direction=se,s,sw\n        bug_start_time=0\n        bug_offset=\"0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200\"\n        [frame]\n            image=\"units/monsters/dragonfly/grand/dragonfly-shadow.png:160\"\n        [/frame]\n        [bug_frame]\n            image=\"units/monsters/dragonfly/grand/dragonfly-flying[1~2].png:80\"\n            auto_vflip=no\n            primary=yes\n        [/bug_frame]\n    [/movement_anim]",
      "[movement_anim]\n        start_time=0\n        direction=ne,n,nw\n        bug_start_time=0\n        bug_offset=\"0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200\"\n        [frame]\n            image=\"units/monsters/dragonfly/grand/dragonfly-n-shadow.png:160\"\n        [/frame]\n        [bug_frame]\n            image=\"units/monsters/dragonfly/grand/dragonfly-n-flying[1~2].png:80\"\n            auto_vflip=no\n            primary=yes\n        [/bug_frame]\n    [/movement_anim]"
    ]
  },
  "Dragonfly Naiad": {
    "id": "Dragonfly Naiad",
    "image": "units/monsters/dragonfly/naiad/naiad.png",
    "profile": "portraits/monsters/naiad.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        start_time=-200\n        offset=0.0~0.65:150,0.65~0.0:200\n        [frame]\n            image=\"units/monsters/dragonfly/naiad/naiad.png:350\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg spear-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Elder Falcon": {
    "id": "Elder Falcon",
    "image": "units/monsters/falcon/elder-falcon.png",
    "profile": "portraits/monsters/falcon-elder.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n\n        start_time=-400\n        bird_start_time=-400\n        bird_offset=0.0:200,0.0~0.6:200,0.6~0.0:300\n        bird_y=0~-30:200,-30~0:200,0:300\n\n        [frame]\n            image=\"units/monsters/falcon/falcon-shadow.png:700\"\n        [/frame]\n        [bird_frame]\n            image=\"units/monsters/falcon/elder-falcon-attack-[1,2,claws,end].png:[100,80,240,280]\"\n            auto_vflip=no\n            primary=yes\n        [/bird_frame]\n\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=beak\n        [/filter_attack]\n\n        start_time=-500\n        bird_start_time=-500\n        bird_offset=0.0:250,0.0~0.8:200,0.8~0.0:350\n        bird_y=0~-40:200,-40~6:250,6~0:350\n\n        [frame]\n            image=\"units/monsters/falcon/falcon-shadow.png:800\"\n        [/frame]\n        [bird_frame]\n            image=\"units/monsters/falcon/elder-falcon-attack-[1,2,beak,end].png:[100,100,250,350]\"\n            auto_vflip=no\n            primary=yes\n        [/bird_frame]\n\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        layer=60 # taken from bat animation\n        start_time=0\n        bird_start_time=0\n        bird_y=0~-2:600,-2~2:1200,2~0:600,0~-4:1200,-4~0:1200\n        [frame]\n            image=\"units/monsters/falcon/elder-falcon-shadow.png:4800\"\n        [/frame]\n        [bird_frame]\n            image=\"units/monsters/falcon/elder-falcon-soar[1~5,4~2,1~5,4~2].png:[200*5,300,400,500,300*5,400*2,300]\"\n            primary=yes\n            auto_vflip=no\n        [/bird_frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        direction=s,se,sw\n        start_time=0\n        [frame]\n            image=\"units/monsters/falcon/elder-falcon.png\"\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        direction=n,ne,nw\n        start_time=0\n        [frame]\n            image=\"units/monsters/falcon/elder-falcon-ne.png\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Falcon": {
    "id": "Falcon",
    "image": "units/monsters/falcon/falcon.png",
    "profile": "portraits/monsters/falcon.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=beak\n        [/filter_attack]\n\n        start_time=-500\n        bird_start_time=-500\n        bird_offset=0.0:200,0.0~0.8:250,0.8~0.0:350\n        bird_y=0~-36:200,-36~0:250,0:350\n\n        [frame]\n            image=\"units/monsters/falcon/falcon-shadow.png:800\"\n        [/frame]\n        [bird_frame]\n            image=\"units/monsters/falcon/falcon-attack-[1,2,beak,end].png:[100,100,250,350]\"\n            auto_vflip=no\n            primary=yes\n        [/bird_frame]\n\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n\n        start_time=-400\n        bird_start_time=-400\n        bird_offset=0.0:200,0.0~0.6:200,0.6~0.0:300\n        bird_y=0~-24:200,-24~0:200,0:300\n\n        [frame]\n            image=\"units/monsters/falcon/falcon-shadow.png:700\"\n        [/frame]\n        [bird_frame]\n            image=\"units/monsters/falcon/falcon-attack-[1,2,claws,end].png:[100,100,200,300]\"\n            auto_vflip=no\n            primary=yes\n        [/bird_frame]\n\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        layer=60 # taken from bat animation\n        start_time=0\n        bird_start_time=0\n        bird_y=0~-2:600,-2~2:1200,2~0:600,0~-4:1200,-4~0:1200\n        [frame]\n            image=\"units/monsters/falcon/falcon-shadow.png:4800\"\n        [/frame]\n        [bird_frame]\n            image=\"units/monsters/falcon/falcon-soar[1~5,4~2,1~5,4~2].png:[200*5,300,400,500,300*5,400*2,300]\"\n            auto_vflip=no\n            primary=yes\n        [/bird_frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        direction=s,se,sw\n        start_time=0\n        [frame]\n            image=\"units/monsters/falcon/falcon.png\"\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        direction=n,ne,nw\n        start_time=0\n        [frame]\n            image=\"units/monsters/falcon/falcon-ne.png\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Fire Dragon": {
    "id": "Fire Dragon",
    "image": "units/monsters/fire-dragon.png",
    "profile": "portraits/monsters/fire-dragon.webp",
    "level": "5",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n\n        start_time=-200\n\n        [frame]\n            image=\"units/monsters/fire-dragon.png:400\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -75}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=tail\n        [/filter_attack]\n\n        start_time=-200\n\n        [frame]\n            image=\"units/monsters/fire-dragon.png:400\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS tail.ogg {SOUND_LIST:MISS} -75}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fire breath\n        [/filter_attack]\n\n        [frame]\n            image=\"units/monsters/fire-dragon.png:400\"\n        [/frame]\n\n        missile_start_time=-240\n        # due to its sheer size, the dragon NE attack breaths straight north\n        [if]\n            direction=n,ne,nw\n            [missile_frame]\n                image=\"projectiles/fire-breath-ne-[1~5].png~FL():80\"\n                image_diagonal=\"projectiles/fire-breath-n-[1~5].png:80\"\n                offset=0.0~1.1\n                directional_x=50~0\n                y=-30~-10\n            [/missile_frame]\n        [/if]\n        [else]\n            direction=s,se,sw\n            [missile_frame]\n                image=\"projectiles/fire-breath-se-[1~5].png~FL():80\"\n                image_diagonal=\"projectiles/fire-breath-s-[1~5].png:80\"\n                offset=0.0~1.1\n                directional_x=50~0\n                y=30~0\n            [/missile_frame]\n        [/else]\n        [if]\n            hits=yes\n            [impact_frame]\n                layer=90\n                image=\"misc/blank-hex.png:1,projectiles/fireball-impact-[2~5].png:60,projectiles/fire-breath-[6~10].png:40\"\n                offset=1.0\n            [/impact_frame]\n        [/if]\n\n        {SOUND:HIT_AND_MISS flame-big.ogg flame-big-miss.ogg -250}\n    [/attack_anim]"
    ]
  },
  "Fire Guardian": {
    "id": "Fire Guardian",
    "image": "units/monsters/fireghost.png",
    "profile": "portraits/monsters/fire_guardian.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fire claws\n        [/filter_attack]\n        offset=0.0~-0.1:100,-0.1~0.0:50,0.0~0.3:50,0.3~0.5:100,0.5~0.6:50,0.6~0.4:100,0.4~0.2:50,0.2~0.0:100\n        start_time=-350\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/monsters/fireghost-attack[1~2].png:250\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/fireghost.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fire breath\n        [/filter_attack]\n        {MISSILE_FRAME_FIRE_BREATH 11,-34 11,15 24,-22 26,10}\n        start_time=-500\n        [frame]\n            image=\"units/monsters/fireghost.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS flame-big.ogg flame-big-miss.ogg -400}\n        [frame]\n            image=\"units/monsters/fireghost-ranged2.png:50,units/monsters/fireghost-attack1.png:200\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/fireghost.png:150\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Fire Wraith": {
    "id": "Fire Wraith",
    "image": "units/monsters/firewraith/firewraith.png",
    "profile": "portraits/monsters/fire_wraith_A.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fire claws\n        [/filter_attack]\n        offset=0.0~-0.1:100,-0.1~0.0:50,0.0~0.3:50,0.3~0.5:100,0.5~0.6:50,0.6~0.4:100,0.4~0.2:50,0.2~0.0:100\n        glow_offset=0.0~-0.1:100,-0.1~0.0:50,0.0~0.3:50,0.3~0.5:100,0.5~0.7:50,0.7~0.4:100,0.4~0.2:50,0.2~0.0:100\n        start_time=-350\n        glow_start_time=-350\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"{IMG_PATH_TEMP}/firewraith.png:350\"\n        [/frame]\n        [glow_frame]\n            image=\"{IMG_PATH_TEMP}/firewraith-halo.png:350\"\n        [/glow_frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fire breath\n        [/filter_attack]\n        {MISSILE_FRAME_FIRE_BREATH 11,-34 11,15 24,-22 26,10}\n        start_time=-500\n        [frame]\n            image=\"{IMG_PATH_TEMP}/firewraith.png:450\"\n        [/frame]\n        [glow_frame]\n            image=\"{IMG_PATH_TEMP}/firewraith-halo.png:450\"\n        [/glow_frame]\n        {SOUND:HIT_AND_MISS flame-big.ogg flame-big-miss.ogg -400}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        glow_start_time=0\n        [frame]\n            image=\"{IMG_PATH_TEMP}/firewraith-s[1~8].png:100\"\n        [/frame]\n        [glow_frame]\n            alpha=1.0~0.7:400,0.7~1.0:400\n            image=\"{IMG_PATH_TEMP}/firewraith-halo.png:100\"\n        [/glow_frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"{IMG_PATH_TEMP}/firewraith.png:200\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Frost Stoat": {
    "id": "Frost Stoat",
    "image": "units/monsters/stoat/stoat.png",
    "profile": "portraits/monsters/stoat.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        start_time=-500\n        offset=0.0:300,0.0~0.6:200,0.6~0.0:300\n        [frame]\n            image=units/monsters/stoat/stoat-bite[1~6].png:[100,100,180,170,150,100]\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=claw\n        [/filter_attack]\n        start_time=-550\n        offset=0.0:350,0.0~0.6:200,0.6~0.0:300\n        [frame]\n            image=units/monsters/stoat/stoat-claws[1~3].png:[140,140,120]\n        [/frame]\n        [frame]\n            image=units/monsters/stoat/stoat-claws[4,5,6].png~CS(-20,-10,50):[100*2,70]\n        [/frame]\n        [frame]\n            image=units/monsters/stoat/stoat-claws6.png:80\n        [/frame]\n        [frame]\n            image=units/monsters/stoat/stoat-low.png:100\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n        frost_start_time=-550\n        frost_alpha=0.0~0.9:500,0.9:100,0.9~0.0:250\n        frost_directional_x=8\n        frost_y=0\n        frost_offset=0.0:350,0.0~0.3:200,0.3~0.0:300\n        [frost_frame]\n            image=\"halo/monster/stoat-frost-blank.png~BLIT(halo/monster/stoat-frost-base.png,18,18)~MASK(halo/monster/stoat-frost-mask.png,18,18):500\"\n            layer=45\n            auto_vflip=no\n        [/frost_frame]\n        [frost_frame]\n            image=\"halo/monster/stoat-frost-blank.png~BLIT(halo/monster/stoat-frost-base.png,18,18)~MASK(halo/monster/stoat-frost-mask.png,18,18)~FL(horiz)~BL(4):100\"\n            layer=45\n            auto_vflip=no\n        [/frost_frame]\n        [frost_frame]\n            image=\"halo/monster/stoat-frost-blank.png~BLIT(halo/monster/stoat-frost-base.png,18,18)~MASK(halo/monster/stoat-frost-mask.png,18,18)~FL(horiz):250\"\n            layer=45\n            auto_vflip=no\n        [/frost_frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=-50\n        #        terrain_type=!,*^B*,Cme*^*,Kme*^*,Wwr*^*,Wwf*^*,!,Chs*^*,Chw*^*,Cm*^*,Km*^*,W*^*,S*^*,*^Vm\n        {STANDARD_IDLE_FILTER}\n        [frame]\n            image=\"units/monsters/stoat/stoat.png:2000\"\n        [/frame]\n        {FS_STANDING_FOG 0 -8}\n    [/standing_anim]",
      "[standing_anim]\n        start_time=-50\n        terrain_type=!,*^B*,Cme*^*,Kme*^*,Wwr*^*,Wwf*^*,!,Chs*^*,Chw*^*,Cm*^*,Km*^*,W*^*,S*^*,*^Vm\n        [frame]\n            image=\"units/monsters/stoat/stoat.png:2000\"\n        [/frame]\n        {FS_STANDING_FOG 0 -8}\n    [/standing_anim]",
      "[standing_anim]\n        start_time=-50\n        [frame]\n            image=\"units/monsters/stoat/stoat-low.png:50\"\n        [/frame]\n        {FS_STANDING_FOG 4 12}\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/monsters/stoat/stoat-moving.png:50\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Giant Mudcrawler": {
    "id": "Giant Mudcrawler",
    "image": "units/monsters/giant-mudcrawler.png",
    "profile": "portraits/monsters/giant-mudcrawler.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mud glob\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            duration=200\n            image=\"projectiles/mud-glob.png\"\n            image_diagonal=\"projectiles/mud-glob.png\"\n        [/missile_frame]\n        start_time=-400\n        {SOUND:HIT_AND_MISS mud-glob.ogg mud-glob-miss.ogg -400}\n        [frame]\n            image=\"units/monsters/giant-mudcrawler-ranged[1~5].png:[125,200*2,100*2]\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fist\n        [/filter_attack]\n        start_time=-500\n        offset=0.0~-0.1:225,-0.1:125,-0.1~0.4:175,0.4:50,0.4~0.0:325\n        {SOUND:HIT_AND_MISS mud-fist.ogg mud-fist-miss.ogg -400}\n        [frame]\n            image=\"units/monsters/giant-mudcrawler-attack[1~11].png:[75*3,150,75*4,100*3]\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Giant Rat": {
    "id": "Giant Rat",
    "image": "units/monsters/giant-rat.png",
    "profile": "portraits/monsters/giant-rat.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        start_time=-500\n        [frame]\n            image=\"units/monsters/giant-rat-attack-[1~7].png:100\"\n        [/frame]\n        {SOUND:HIT bite-small.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Giant Scorpion": {
    "id": "Giant Scorpion",
    "image": "units/monsters/scorpion/scorpion.png",
    "profile": "portraits/monsters/scorpion-elder.webp~FL()",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=pincers\n        [/filter_attack]\n        direction=s,sw,se\n        start_time=-240\n        offset=0.0~-0.1:200,-0.1~0.7:160,0.7~0.0:240\n        [frame]\n            image=\"units/monsters/scorpion/scorpion-pincer-[1~6].png:[100,100,80*2,120,120]\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/scorpion/scorpion.png:1\"\n        [/frame]\n        {SOUND:HIT_AND_MISS pincers.ogg {SOUND_LIST:MISS} -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=pincers\n        [/filter_attack]\n        direction=n,nw,ne\n        start_time=-240\n        offset=0.0~-0.2:200,-0.2~0.6:160,0.6~0.0:240\n        [frame]\n            image=\"units/monsters/scorpion/scorpion-ne-pincer[1~6].png:[100,120,100,80,100,100]\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/scorpion/scorpion-ne.png:1\"\n        [/frame]\n        {SOUND:HIT_AND_MISS pincers.ogg {SOUND_LIST:MISS} -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sting\n        [/filter_attack]\n        start_time=-620\n        offset=0.0:320,0.0~0.8:240,0.8~0.0:320\n        [frame]\n            image=\"units/monsters/scorpion/scorpion-stinger-[1~7,6,5,4,1].png:[80,100,120,80*8]\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/scorpion/scorpion.png:1\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=pincers\n            [/filter_attack]\n            direction=s,sw,se\n            start_time=-240\n            offset=0.0~-0.1:200,-0.1~0.7:160,0.7~0.0:240\n            [frame]\n                image=\"units/monsters/scorpion/sand-scuttler-pincer-[1~6].png:[100,100,80*2,120,120]\"\n            [/frame]\n            [frame]\n                image=\"units/monsters/scorpion/sand-scuttler.png:1\"\n            [/frame]\n            {SOUND:HIT_AND_MISS pincers.ogg {SOUND_LIST:MISS} -150}\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=pincers\n            [/filter_attack]\n            direction=n,nw,ne\n            start_time=-240\n            offset=0.0~-0.2:200,-0.2~0.6:160,0.6~0.0:240\n            [frame]\n                image=\"units/monsters/scorpion/sand-scuttler-ne-pincer[1~6].png:[100,120,100,80,100,100]\"\n            [/frame]\n            [frame]\n                image=\"units/monsters/scorpion/sand-scuttler-ne.png:1\"\n            [/frame]\n            {SOUND:HIT_AND_MISS pincers.ogg {SOUND_LIST:MISS} -150}\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=sting\n            [/filter_attack]\n            start_time=-620\n            offset=0.0:320,0.0~0.8:240,0.8~0.0:320\n            [frame]\n                image=\"units/monsters/scorpion/sand-scuttler-stinger-[1~7,6,5,4,1].png:[80,100,120,80*8]\"\n            [/frame]\n            [frame]\n                image=\"units/monsters/scorpion/sand-scuttler.png:1\"\n            [/frame]\n            {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -100}\n        [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        direction=s,sw,se\n        [frame]\n            image=\"units/monsters/scorpion/scorpion.png:150\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        direction=n,nw,ne\n        [frame]\n            image=\"units/monsters/scorpion/scorpion-ne.png:150\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n            start_time=0\n            direction=s,sw,se\n            [frame]\n                image=\"units/monsters/scorpion/sand-scuttler.png:150\"\n            [/frame]\n        [/standing_anim]",
      "[standing_anim]\n            start_time=0\n            direction=n,nw,ne\n            [frame]\n                image=\"units/monsters/scorpion/sand-scuttler-ne.png:150\"\n            [/frame]\n        [/standing_anim]"
    ]
  },
  "Giant Scorpling": {
    "id": "Giant Scorpling",
    "image": "units/monsters/scorpion/scorpling.png",
    "profile": "portraits/monsters/scorpion.webp~FL()~CROP(0,82,400,318)",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=pincers\n        [/filter_attack]\n        start_time=-300\n        offset=0:200,0~0.6:150,0.6~0:150\n        [frame]\n            image=\"units/monsters/scorpion/scorpling-pincer[1~7].png:[50,75,75,50,50,75,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS pincers.ogg {SOUND_LIST:MISS} -50}\n        [frame]\n            image=\"units/monsters/scorpion/scorpling.png:25\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sting\n        [/filter_attack]\n        start_time=-250\n        offset=0:150,0~0.6:150,0.6:100,0.6~0:150\n        [frame]\n            image=\"units/monsters/scorpion/scorpling-sting[1~5].png:[75,75,150,100,150]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/monsters/scorpion/scorpling.png:1\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Giant Spider": {
    "id": "Giant Spider",
    "image": "units/monsters/spider.png",
    "profile": "portraits/monsters/giant-spider.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        start_time=-400\n        [filter_attack]\n            name=web\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            duration=200\n            image=\"projectiles/web.png\"\n            image_diagonal=\"projectiles/web.png\"\n        [/missile_frame]\n        [frame]\n            image=\"units/monsters/spider-ranged-[1~7,3~1].png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS net.wav {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        start_time=-400\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        [frame]\n            image=\"units/monsters/spider-melee-[1~13].png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ]
  },
  "Bay Horse": {
    "id": "Bay Horse",
    "image": "units/monsters/horse/horse.png",
    "profile": "portraits/monsters/horse.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=hooves\n        [/filter_attack]\n        start_time=-550\n        offset=0.0~-0.05:350,-0.05~0.7:200,0.7~0.0:320\n        [frame]\n            image=\"units/monsters/horse/horse-attack[1~7].png:[100*4,80,70,260]\"\n            sound=horse-elf-canter.wav\n        [/frame]\n        [frame]\n            image=\"units/monsters/horse/horse.png:60\"\n        [/frame]\n        {SOUND:HIT club.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Black Horse": {
    "id": "Black Horse",
    "image": "units/monsters/horse/horse-larger.png",
    "profile": "portraits/monsters/horse.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=hooves\n        [/filter_attack]\n        start_time=-550\n        offset=0.0~-0.05:350,-0.05~0.7:200,0.7~0.0:320\n        [frame]\n            image=\"units/monsters/horse/horse-larger-attack[1~7].png{HORSE_BLACK_IPF}:[100*4,80,70,260]\"\n            sound=horse-elf-canter.wav\n        [/frame]\n        [frame]\n            image=\"units/monsters/horse/horse-larger.png{HORSE_BLACK_IPF}:60\"\n        [/frame]\n        {SOUND:HIT club.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=whinny\n        [/filter_attack]\n        start_time=-550\n        {MISSILE_FRAME_WAIL}\n        [frame]\n            image=\"units/monsters/horse/horse-larger.png{HORSE_BLACK_IPF}:60\"\n        [/frame]\n        {SOUND:HIT wail-sml.wav -100}\n    [/attack_anim]"
    ]
  },
  "Dark Horse": {
    "id": "Dark Horse",
    "image": "units/monsters/horse/horse.png",
    "profile": "portraits/monsters/dark-horse.webp",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=hooves\n        [/filter_attack]\n        start_time=-550\n        offset=0.0~-0.05:350,-0.05~0.7:200,0.7~0.0:320\n        [frame]\n            image=\"units/monsters/horse/horse-attack[1~7].png{HORSE_BLACK_IPF}:[100*4,80,70,260]\"\n            sound=horse-elf-canter.wav\n        [/frame]\n        [frame]\n            image=\"units/monsters/horse/horse.png{HORSE_BLACK_IPF}:60\"\n        [/frame]\n        {SOUND:HIT club.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=whinny\n        [/filter_attack]\n        start_time=-550\n        {MISSILE_FRAME_WAIL}\n        [frame]\n            image=\"units/monsters/horse/horse.png{HORSE_BLACK_IPF}:60\"\n        [/frame]\n        {SOUND:HIT wail-sml.wav -100}\n    [/attack_anim]"
    ]
  },
  "Great Horse": {
    "id": "Great Horse",
    "image": "units/monsters/horse/horse-larger.png",
    "profile": "portraits/monsters/great-horse.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=hooves\n        [/filter_attack]\n        start_time=-550\n        offset=0.0~-0.05:350,-0.05~0.7:200,0.7~0.0:320\n        [frame]\n            image=\"units/monsters/horse/horse-larger-attack[1~7].png:[100*4,80,70,260]\"\n            sound=horse-elf-canter.wav\n        [/frame]\n        [frame]\n            image=\"units/monsters/horse/horse-larger.png:60\"\n        [/frame]\n        {SOUND:HIT club.ogg -100}\n    [/attack_anim]"
    ]
  },
  "White Horse": {
    "id": "White Horse",
    "image": "units/monsters/horse/horse.png{HORSE_WHITE_IPF}",
    "profile": "portraits/monsters/white-horse.webp",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=hooves\n        [/filter_attack]\n        start_time=-550\n        offset=0.0~-0.05:350,-0.05~0.7:200,0.7~0.0:320\n        [frame]\n            image=\"units/monsters/horse/horse-attack[1~7].png{HORSE_WHITE_IPF}:[100*4,80,70,260]\"\n            sound=horse-elf-canter.wav\n        [/frame]\n        [frame]\n            image=\"units/monsters/horse/horse.png{HORSE_WHITE_IPF}:60\"\n        [/frame]\n        {SOUND:HIT club.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Icemonax": {
    "id": "Icemonax",
    "image": "units/monsters/icemonax/young-icemonax.png",
    "profile": "portraits/monsters/small-icemonax.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n        start_time=-400\n        offset=0.0:150,0.0~0.6:250,0.6~0.0:200\n        [frame]\n            image=\"units/monsters/icemonax/young-icemonax-attack[1~4].png:[150*2,100,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        start_time=-250\n        offset=0.0~0.6:250,0.6~0.0:390\n        frost_start_time=-250\n        [if]\n            hits=no\n            [frost_frame]\n                halo=\"halo/elven/nature-halo[1~8].png~CS(-10,-10,20):[80*8]\"\n                alpha=0.8~0.0:640\n                offset=0.1~0.6:250,0.6:390\n                auto_vflip=no\n            [/frost_frame]\n            [frame]\n                image=\"units/monsters/icemonax/young-icemonax.png:640\"\n            [/frame]\n        [/if]\n        [else]\n            hits=yes\n            [frost_frame]\n                halo=\"halo/elven/nature-halo[1~8].png~CS(-10,-10,20):[80*8]\"\n                offset=0.1~0.7:250,0.7~1.0:390\n                auto_vflip=no\n            [/frost_frame]\n            [frame]\n                image=\"units/monsters/icemonax/young-icemonax.png:640\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=-50\n        [frame]\n            image=\"units/monsters/icemonax/young-icemonax.png\"\n            duration=50\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=-50\n        terrain_type=!,*^B*,Cme*^*,Kme*^*,Wwr*^*,Wwf*^*,!,Chs*^*,Chw*^*,Cm*^*,Km*^*,W*^*,S*^*,*^Vm\n        [frame]\n            image=\"units/monsters/icemonax/young-icemonax-water.png\"\n            duration=50\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Great Icemonax": {
    "id": "Great Icemonax",
    "image": "units/monsters/icemonax/great-icemonax.png",
    "profile": "portraits/monsters/big-icemonax.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n        start_time=-640\n        offset=0.0~-0.05:400,~0.05~0.6:240,0.6~0.0:240\n        [frame]\n            image=\"units/monsters/icemonax/great-icemonax-claws[1~9].png:[80*8,240]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=tail\n        [/filter_attack]\n        start_time=-650\n        offset=0.0~-0.05:350,-0.05~0.7:300,0.7~0.0:300\n        [frame]\n            image=\"units/monsters/icemonax/great-icemonax-tail[1~9].png:[100,150,150,100,80,70,80,100,120]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS tail.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        start_time=-250\n        offset=0.0~0.6:250,0.6~0.0:390\n        frost_start_time=-250\n        [if]\n            hits=no\n            [frost_frame]\n                halo=\"halo/elven/nature-halo[1~8].png~SCALE(108,108)~CS(-10,-10,20):[80*8]\"\n                alpha=0.8~0.0:640\n                offset=0.1~0.6:250,0.6:390\n                auto_vflip=no\n            [/frost_frame]\n            [frame]\n                image=\"units/monsters/icemonax/great-icemonax.png:640\"\n            [/frame]\n        [/if]\n        [else]\n            hits=yes\n            [frost_frame]\n                halo=\"halo/elven/nature-halo[1~8].png~SCALE(108,108)~CS(-10,-10,20):[80*8]\"\n                offset=0.1~0.7:250,0.7~1.0:390\n                auto_vflip=no\n            [/frost_frame]\n            [frame]\n                image=\"units/monsters/icemonax/great-icemonax.png:640\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=-50\n        [frame]\n            image=\"units/monsters/icemonax/great-icemonax.png\"\n            duration=50\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=-50\n        terrain_type=!,*^B*,Cme*^*,Kme*^*,Wwr*^*,Wwf*^*,!,Chs*^*,Chw*^*,Cm*^*,Km*^*,W*^*,S*^*,*^Vm\n        [frame]\n            image=\"units/monsters/icemonax/great-icemonax-water.png\"\n            duration=50\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Jinn": {
    "id": "Jinn",
    "image": "units/monsters/jinn/jinn.png",
    "profile": "portraits/monsters/jinn.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=desert windblast\n        [/filter_attack]\n\n        # can't get missile offset or alpha to do anything other than default, will worry about it later\n        missile_start_time=-220\n        missile_alpha=0.0~0.6:100,0.6~0.0:220\n        missile_offset=-0.3~1.2:320\n        [if]\n            hits=yes\n            [missile_frame]\n                halo=\"halo/elven/druid-healing[1~8].png:40\"\n                halo_mod=\"~CS(55,15,-65)\"\n                #    offset=-0.5~1.2:320\n            [/missile_frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                halo=\"halo/elven/druid-healing[1~8].png:40\"\n                halo_mod=\"~CS(55,15,-65)\"\n                halo_y=0:50,0~-72:320\n                #   offset=-0.5~0.4:320\n            [/missile_frame]\n        [/else]\n\n        start_time=-540\n        [frame]\n            image=\"{IMG_PATH_TEMP}/jinn-wind-[1~9].png:[80*6,90*3]\"\n        [/frame]\n        [frame]\n            image=\"{IMG_PATH_TEMP}/jinn.png:1\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS magic-dark-big.ogg magic-dark-big-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=desert lightning\n        [/filter_attack]\n\n        {LIGHTNING_BOLT 1}\n\n        start_time=-700\n        {SOUND:HIT_AND_MISS lightning.ogg lightning-miss.ogg -300}\n        [frame]\n            image=\"{IMG_PATH_TEMP}/jinn-lightning-[1~5,1].png:[100,120,110,110,180,80]\"\n        [/frame]\n        [frame]\n            image=\"{IMG_PATH_TEMP}/jinn.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n\n        start_time=-400\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n        offset=0.0:200,0.0~0.6:200,0.6~0.0:350\n        [frame]\n            image=\"{IMG_PATH_TEMP}/jinn-attack-[1~4].png:[150*4]\"\n        [/frame]\n        [frame]\n            image=\"{IMG_PATH_TEMP}/jinn.png:150\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        top_start_time=0\n        top_y=-2~2:1000,2~-2:1000\n        [frame]\n            image=\"{IMG_PATH_TEMP}/jinn-bottom[1~3,2,1~6,1,4,3].png:[150*12,200]\"\n        [/frame]\n        [top_frame]\n            image=\"{IMG_PATH_TEMP}/jinn-top.png:400,{IMG_PATH_TEMP}/jinn-top-hi.png:400,{IMG_PATH_TEMP}/jinn-top.png:600,{IMG_PATH_TEMP}/jinn-top-lo.png:600,\"\n            auto_vflip=no\n            primary=yes\n        [/top_frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        offset=0.0~1.0:200\n        [frame]\n            image=\"{IMG_PATH_TEMP}/jinn.png:200\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Kraken": {
    "id": "Kraken",
    "image": "units/monsters/kraken/kraken.png",
    "profile": "portraits/monsters/kraken.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=ink\n        [/filter_attack]\n        missile_start_time=-300\n        [missile_frame]\n            image=\"projectiles/inkstream-n.png:180,projectiles/inkstream-cloud.png~O(0.6):120\"\n            image_diagonal=\"projectiles/inkstream-ne.png:180,projectiles/inkstream-cloud.png~O(0.6):120\"\n        [/missile_frame]\n        start_time=-350\n        [frame]\n            image=\"units/monsters/kraken/kraken-defend1.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/kraken/kraken-ink.png:300\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/kraken/kraken-defend1.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS ink.ogg ink-miss.ogg -200}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=tentacle\n        [/filter_attack]\n        direction=s,se,sw\n        start_time=-350\n        offset=0.0~-0.05:210,-0.05~0.6:150,0.6~0.0:200\n        [frame]\n            image=\"units/monsters/kraken/kraken-slap[1~4].png:[100,140,120,140]\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/kraken/kraken.png:1\"\n            sound=\n        [/frame]\n        {SOUND:HIT_AND_MISS squishy-strike.wav squishy-miss.wav -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=tentacle\n        [/filter_attack]\n        direction=s,se,sw\n        start_time=-350\n        offset=0.0~-0.05:210,-0.05~0.6:150,0.6~0.0:200\n        [frame]\n            image=\"units/monsters/kraken/kraken-slap[1~4]b.png:[100,140,120,140]\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/kraken/kraken.png:1\"\n            sound=\n        [/frame]\n        {SOUND:HIT_AND_MISS squishy-strike.wav squishy-miss.wav -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=tentacle\n        [/filter_attack]\n        direction=n,ne,nw\n        start_time=-350\n        offset=0.0~-0.05:210,-0.05~0.6:150,0.6~0.0:200\n        [frame]\n            image=\"units/monsters/kraken/kraken-slap[1~4].png:[100,140,120,140]\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/kraken/kraken.png:1\"\n            sound=\n        [/frame]\n        {SOUND:HIT_AND_MISS squishy-strike.wav squishy-miss.wav -100}\n    [/attack_anim]"
    ]
  },
  "Mudcrawler": {
    "id": "Mudcrawler",
    "image": "units/monsters/mudcrawler.png",
    "profile": "portraits/monsters/mudcrawler.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mud glob\n        [/filter_attack]\n        missile_start_time=-200\n        [missile_frame]\n            duration=200\n            image=\"projectiles/mud-glob.png\"\n            image_diagonal=\"projectiles/mud-glob.png\"\n        [/missile_frame]\n        start_time=-400\n        [frame]\n            image=\"units/monsters/mudcrawler-attack-[1~5].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mud-glob.ogg mud-glob-miss.ogg -400}\n    [/attack_anim]"
    ]
  },
  "Raven": {
    "id": "Raven",
    "image": "units/monsters/raven/raven.png",
    "profile": "portraits/monsters/raven.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=beak\n        [/filter_attack]\n\n        start_time=-400\n        bird_start_time=-400\n        bird_offset=0.0:200,0.0~0.6:200,0.6~0.0:300\n        bird_y=0~-24:200,-24~0:200,0:300\n\n        [frame]\n            image=\"units/monsters/raven/raven-shadow.png:700\"\n        [/frame]\n        [bird_frame]\n            image=\"units/monsters/raven/raven-soar.png:700\"\n            auto_vflip=no\n            primary=yes\n        [/bird_frame]\n\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        layer=60 # taken from bat animation\n        start_time=0\n        bird_start_time=0\n        bird_y=0~-2:600,-2~2:1200,2~0:600,0~-4:1200,-4~0:1200\n        [frame]\n            image=\"units/monsters/raven/raven-shadow.png:4800\"\n        [/frame]\n        [bird_frame]\n            image=\"units/monsters/raven/raven-soar.png:4800\"\n            auto_vflip=no\n            primary=yes\n        [/bird_frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        direction=s,se,sw\n        start_time=0\n        [frame]\n            image=\"units/monsters/raven/raven.png\"\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        direction=n,ne,nw\n        start_time=0\n        [frame]\n            image=\"units/monsters/raven/raven-ne.png\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "War Harbinger": {
    "id": "War Harbinger",
    "image": "units/monsters/raven/harbinger.png",
    "profile": "portraits/monsters/war-harbinger.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n\n        start_time=-500\n        bird_start_time=-500\n        bird_offset=0.0:200,0.0~0.8:250,0.8~0.0:350\n        bird_y=0~-36:200,-36~0:250,0:350\n\n        [frame]\n            image=\"units/monsters/raven/raven-shadow.png:700\"\n        [/frame]\n        [bird_frame]\n            image=\"units/monsters/raven/harbinger-soar.png:700\"\n            auto_vflip=no\n            primary=yes\n        [/bird_frame]\n\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=beak\n        [/filter_attack]\n\n        start_time=-400\n        bird_start_time=-400\n        bird_offset=0.0:200,0.0~0.6:200,0.6~0.0:300\n        bird_y=0~-24:200,-24~0:200,0:300\n\n        [frame]\n            image=\"units/monsters/raven/raven-shadow.png:700\"\n        [/frame]\n        [bird_frame]\n            image=\"units/monsters/raven/harbinger-soar.png:700\"\n            auto_vflip=no\n            primary=yes\n        [/bird_frame]\n\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=lightning\n        [/filter_attack]\n\n        {LIGHTNING_BOLT 2 }\n\n        start_time=-300\n        {SOUND:HIT_AND_MISS lightning.ogg lightning-miss.ogg -300}\n        [frame]\n            image=\"units/monsters/raven/harbinger.png:550\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        layer=60 # taken from bat animation\n        start_time=0\n        bird_start_time=0\n        bird_y=0~-2:600,-2~2:1200,2~0:600,0~-4:1200,-4~0:1200\n        [frame]\n            image=\"units/monsters/raven/raven-shadow.png:4800\"\n        [/frame]\n        [bird_frame]\n            image=\"units/monsters/raven/harbinger-soar.png:4800\"\n            auto_vflip=no\n            primary=yes\n        [/bird_frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        direction=s,se,sw\n        start_time=0\n        [frame]\n            image=\"units/monsters/raven/harbinger.png\"\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        direction=n,ne,nw\n        start_time=0\n        [frame]\n            image=\"units/monsters/raven/harbinger-ne.png\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Dark Omen": {
    "id": "Dark Omen",
    "image": "units/monsters/raven/herald.png",
    "profile": "portraits/monsters/herald.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=beak\n        [/filter_attack]\n\n        start_time=-400\n        bird_start_time=-400\n        bird_offset=0.0:200,0.0~0.6:200,0.6~0.0:300\n        bird_y=0~-24:200,-24~0:200,0:300\n\n        [frame]\n            image=\"units/monsters/raven/raven-shadow.png:700\"\n        [/frame]\n        [bird_frame]\n            image=\"units/monsters/raven/herald-soar.png:700\"\n            auto_vflip=no\n            primary=yes\n        [/bird_frame]\n\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=lightning\n        [/filter_attack]\n\n        {LIGHTNING_BOLT 2 }\n\n        start_time=-300\n        {SOUND:HIT_AND_MISS lightning.ogg lightning-miss.ogg -300}\n        [frame]\n            image=\"units/monsters/raven/herald.png:550\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        layer=60 # taken from bat animation\n        start_time=0\n        bird_start_time=0\n        bird_y=0~-2:600,-2~2:1200,2~0:600,0~-4:1200,-4~0:1200\n        [frame]\n            image=\"units/monsters/raven/raven-shadow.png:4800\"\n        [/frame]\n        [bird_frame]\n            image=\"units/monsters/raven/herald-soar.png:4800\"\n            auto_vflip=no\n            primary=yes\n        [/bird_frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        direction=s,se,sw\n        start_time=0\n        [frame]\n            image=\"units/monsters/raven/herald.png\"\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        direction=n,ne,nw\n        start_time=0\n        [frame]\n            image=\"units/monsters/raven/herald-ne.png\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Roc": {
    "id": "Roc",
    "image": "units/monsters/roc.png",
    "profile": "portraits/monsters/roc.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n\n        start_time=-200\n\n        [frame]\n            image=\"units/monsters/roc-attack.png:300\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=beak\n        [/filter_attack]\n\n        start_time=-200\n\n        [frame]\n            image=\"units/monsters/roc-attack.png:300\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=rock\n        [/filter_attack]\n\n        start_time=-1000\n        bird_start_time=-1000\n        stone_start_time=-800\n        bird_y=0~-4:150,-4~4:100,4~0:250,0:500\n\n        # the halo_x/y values were simply lifted from the troll rocklobber, but seem OK for now\n        [stone_frame]\n            halo=\"projectiles/stone-large.png:800\"\n            halo_x=24~0\n            halo_y=0~-10,-10~-18,-18~-22,-22~-24,-24~-25,-25~-24,-24~-22,-22~-18,-18~-10,-10~-0\n            offset=0.0~1.0\n        [/stone_frame]\n        [bird_frame]\n            image=\"units/monsters/roc-soar.png:1000\"\n            auto_vflip=no\n            offset=0.0\n        [/bird_frame]\n        [frame]\n            image=units/monsters/roc-shadow2.png:1000\n            offset=0.0\n        [/frame]\n\n        {SOUND:HIT_AND_MISS sling-big.ogg sling-big-miss -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        bird_start_time=0\n        bird_y=0~-4:600,-4~2:1200,2~0:600\n        [frame]\n            image=units/monsters/roc-shadow[2,1,2,3,2].png:[400,400,750,500,350]\n        [/frame]\n        [bird_frame]\n            image=units/monsters/roc-soar.png:2400\n            auto_vflip=no\n        [/bird_frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        bird_start_time=0\n        bird_y=0~-4:1000,-4~0:1000\n        bird_offset=\"0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200\"\n        [frame]\n            image=units/monsters/roc-shadow2.png:2000\n        [/frame]\n        [bird_frame]\n            image=units/monsters/roc-soar.png:2000\n            auto_vflip=no\n        [/bird_frame]\n    [/movement_anim]"
    ]
  },
  "Rock Scorpion": {
    "id": "Rock Scorpion",
    "image": "units/monsters/scorpion/rock-scorpion.png",
    "profile": "portraits/monsters/scorpion-rock.webp~FL()",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=pincers\n        [/filter_attack]\n        # direction=s,sw,se\n        start_time=-560\n        offset=0.0~-0.1:360,-0.1~0.7:200,0.7~0.0:240\n        [frame]\n            image=\"units/monsters/scorpion/rock-scorpion-pincer-[1~8].png:[80*7,120]\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/scorpion/rock-scorpion.png:120\"\n        [/frame]\n        {SOUND:HIT_AND_MISS pincers.ogg {SOUND_LIST:MISS} -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=pincers\n        [/filter_attack]\n        direction=n,nw,ne\n        start_time=-240\n        offset=0.0~-0.2:200,-0.2~0.6:160,0.6~0.0:240\n        [frame]\n            image=\"units/monsters/scorpion/rock-scorpion-ne-pincer[1~6].png:[100,120,100,80,100,100]\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/scorpion/rock-scorpion-ne.png:1\"\n        [/frame]\n        {SOUND:HIT_AND_MISS pincers.ogg {SOUND_LIST:MISS} -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spray\n        [/filter_attack]\n        start_time=-350\n        missile_start_time=-250\n        [missile_frame]\n            duration=250\n            image=\"projectiles/water-spray.png~CS(20,150,-170)\"\n            image_diagonal=\"projectiles/water-spray.png~CS(20,150,-170)\"\n        [/missile_frame]\n        [frame]\n            image=\"units/monsters/scorpion/rock-scorpion.png:400\"\n            # image=\"units/monsters/scorpion/rock-scorpion-stinger-[1~5].png:[80*5]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS squishy-strike.wav squishy-miss.wav -200}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        direction=s,sw,se\n        [frame]\n            image=\"units/monsters/scorpion/rock-scorpion.png:150\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        direction=n,nw,ne\n        [frame]\n            image=\"units/monsters/scorpion/rock-scorpion-ne.png:150\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Sand Scamperer": {
    "id": "Sand Scamperer",
    "image": "units/monsters/scorpion/scorpling.png{SAND_SCAMPERER_IPF}",
    "profile": "portraits/monsters/scamperer.webp~FL()~CROP(0,82,400,318)",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=pincers\n        [/filter_attack]\n        start_time=-300\n        offset=0:200,0~0.6:150,0.6~0:150\n        [frame]\n            image=\"units/monsters/scorpion/scorpling-pincer[1~7].png{SAND_SCAMPERER_IPF}:[50,75,75,50,50,75,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS pincers.ogg {SOUND_LIST:MISS} -50}\n        [frame]\n            image=\"units/monsters/scorpion/scorpling.png{SAND_SCAMPERER_IPF}:25\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sting\n        [/filter_attack]\n        start_time=-250\n        offset=0:150,0~0.6:150,0.6:100,0.6~0:150\n        [frame]\n            image=\"units/monsters/scorpion/scorpling-sting[1~5].png{SAND_SCAMPERER_IPF}:[75,75,150,100,150]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/monsters/scorpion/scorpling.png{SAND_SCAMPERER_IPF}:1\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Sand Scuttler": {
    "id": "Sand Scuttler",
    "image": "units/monsters/scorpion/sand-scuttler.png",
    "profile": "portraits/monsters/scuttler.webp~FL()",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=pincers\n        [/filter_attack]\n        direction=s,sw,se\n        start_time=-240\n        offset=0.0~-0.1:200,-0.1~0.7:160,0.7~0.0:240\n        [frame]\n            image=\"units/monsters/scorpion/sand-scuttler-pincer-[1~6].png:[100,100,80*2,120,120]\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/scorpion/sand-scuttler.png:1\"\n        [/frame]\n        {SOUND:HIT_AND_MISS pincers.ogg {SOUND_LIST:MISS} -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=pincers\n        [/filter_attack]\n        direction=n,nw,ne\n        start_time=-240\n        offset=0.0~-0.2:200,-0.2~0.6:160,0.6~0.0:240\n        [frame]\n            image=\"units/monsters/scorpion/sand-scuttler-ne-pincer[1~6].png:[100,120,100,80,100,100]\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/scorpion/sand-scuttler-ne.png:1\"\n        [/frame]\n        {SOUND:HIT_AND_MISS pincers.ogg {SOUND_LIST:MISS} -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sting\n        [/filter_attack]\n        start_time=-620\n        offset=0.0:320,0.0~0.8:240,0.8~0.0:320\n        [frame]\n            image=\"units/monsters/scorpion/sand-scuttler-stinger-[1~7,6,5,4,1].png:[80,100,120,80*8]\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/scorpion/sand-scuttler.png:1\"\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        direction=s,sw,se\n        [frame]\n            image=\"units/monsters/scorpion/sand-scuttler.png:150\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        direction=n,nw,ne\n        [frame]\n            image=\"units/monsters/scorpion/sand-scuttler-ne.png:150\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Horned Scarab": {
    "id": "Horned Scarab",
    "image": "units/monsters/scarab/scarab.png",
    "profile": "portraits/monsters/scarab.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        start_time=-150\n        offset=0.0~0.6:150,0.6~0.0:200\n        [frame]\n            image=units/monsters/scarab/scarab.png:450\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=horn\n        [/filter_attack]\n        start_time=-300\n        offset=0.0~-0.05:120,-0.05~0.6:180,0.6~0.0:220\n        [frame]\n            image=units/monsters/scarab/scarab-horn-[1,2].png:[130,170]\n        [/frame]\n        [frame]\n            image=units/monsters/scarab/scarab.png:220\n        [/frame]\n        {SOUND:HIT_AND_MISS spear.ogg spear-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Great Seahorse": {
    "id": "Great Seahorse",
    "image": "units/monsters/seahorse.png",
    "profile": "portraits/monsters/seahorse.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=water spray\n        [/filter_attack]\n        start_time=-270\n\n        missile_start_time=-165\n        [missile_frame]\n            duration=165\n            image=\"projectiles/water-spray.png~SCALE(35,35):75,projectiles/water-spray.png:90\"\n            image_diagonal=\"projectiles/water-spray.png~SCALE(35,35):75,projectiles/water-spray.png:90\"\n        [/missile_frame]\n\n        [frame]\n            image=\"units/monsters/seahorse-spit[1,2].png~MASK(units/monsters/seahorse-mask.png):[150,120]\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/seahorse.png~MASK(units/monsters/seahorse-mask.png):200\"\n            sound=water-blast.wav\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        start_time=-400\n        offset=0.0~-0.05:160,-0.05~0.6:240,0.6~0.0:300\n\n        [frame]\n            image=\"units/monsters/seahorse-attack[1~6].png~MASK(units/monsters/seahorse-mask.png):[80*5,300]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg miss-2.ogg -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        horse_start_time=0\n        horse_layer=1\n        horse_y=5~7:600,7~5:600\n        [frame]\n            image=\"units/monsters/seahorse-shadow.png~O(0.3):1200\"\n        [/frame]\n        [horse_frame]\n            image=\"units/monsters/seahorse.png~MASK(units/monsters/seahorse-mask.png):1200\"\n            auto_vflip=no\n            primary=yes\n        [/horse_frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        horse_start_time=0\n        horse_layer=1\n        horse_y=4~8:600,8~4:600\n        horse_offset=0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200\n        [frame]\n            image=\"units/monsters/seahorse-shadow.png~O(0.3):1200\"\n        [/frame]\n        [horse_frame]\n            image=\"units/monsters/seahorse.png~MASK(units/monsters/seahorse-mask.png):1200\"\n            auto_vflip=no\n            primary=yes\n        [/horse_frame]\n    [/movement_anim]"
    ]
  },
  "Sea Serpent": {
    "id": "Sea Serpent",
    "image": "units/monsters/seaserpent.png",
    "profile": "portraits/monsters/sea-serpent.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/monsters/seaserpent.png:400\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Shadow Jumping Spider": {
    "id": "Shadow Jumping Spider",
    "image": "units/monsters/jumping-spider.png",
    "profile": "portraits/monsters/jumping-spider.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        start_time=-440\n        offset=0.0~-0.1:340,-0.1~0.6:100,0.6~0.0:210\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        direction=ne,n,nw\n        [frame]\n            image=\"units/monsters/jumping-spider-ne-attack[1~4,1].png:[125,115,100,110,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]",
      "[attack_anim]\n        start_time=-440\n        offset=0.0~-0.1:340,-0.1~0.6:100,0.6~0.0:210\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        direction=se,s,sw\n        [frame]\n            image=\"units/monsters/jumping-spider-attack[1~4,1].png:[125,115,100,110,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        direction=s,se,sw\n        start_time=0\n        [frame]\n            image=\"units/monsters/jumping-spider.png\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        direction=n,ne,nw\n        start_time=0\n        [frame]\n            image=\"units/monsters/jumping-spider-ne.png\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        direction=se,s,sw\n        terrain_type=W*^*,S*^*,D*^*,T*^*,*^T*,A*^*\n        offset=\"0:120,0~1:80\"\n        [frame]\n            image=\"units/monsters/jumping-spider.png\"\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        start_time=0\n        direction=se,s,sw\n        offset=\"0~1:200\"\n        [frame]\n            image=\"units/monsters/jumping-spider.png\"\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        start_time=0\n        direction=ne,n,nw\n        terrain_type=W*^*,S*^*,D*^*,T*^*,*^T*,A*^*\n        offset=\"0:120,0~1:80\"\n        [frame]\n            image=\"units/monsters/jumping-spider-ne.png\"\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        start_time=0\n        direction=ne,n,nw\n        offset=\"0~1:200\"\n        [frame]\n            image=\"units/monsters/jumping-spider-ne.png\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Skeletal Dragon": {
    "id": "Skeletal Dragon",
    "image": "units/monsters/skeletal-dragon/skeletal-dragon.png",
    "level": "4",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n        offset=\"0~0.2,0.2~0\"\n        start_time=-200\n        [frame]\n            image=\"units/monsters/skeletal-dragon/skeletal-dragon.png:400\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=jaw\n        [/filter_attack]\n        offset=\"0~0.3,0.3~0\"\n        start_time=-150\n        [frame]\n            image=\"units/monsters/skeletal-dragon/skeletal-dragon.png:400\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ]
  },
  "Tentacle of the Deep": {
    "id": "Tentacle of the Deep",
    "image": "units/monsters/deep-tentacle.png",
    "profile": "portraits/monsters/deep-tentacle.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=tentacle\n        [/filter_attack]\n        start_time=-480\n        offset=0~0.1,0.1~0.2,0.2,0.2~0.1,0.1~0,0,0\n        ripples_start_time=-480\n        ripples_offset=0~0.1,0.1~0.2,0.2,0.2~0.1,0.1~0,0,0\n        ripples_layer=10\n        ripples_y=19\n        [ripples_frame]\n            image=\"halo/ripples/ripple[1~13].png:55\"\n        [/ripples_frame]\n        [if]\n            direction=sw,s,se\n            [frame]\n                image=\"units/monsters/deep-tentacle-melee-s-[1~6].png:[120*4,60*2]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=ne,n,nw\n            [frame]\n                image=\"units/monsters/deep-tentacle-melee-n-[1~6].png:[120*4,60*2]\"\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/monsters/deep-tentacle.png:115\"\n        [/frame]\n        {SOUND:HIT_AND_MISS squishy-hit.wav squishy-miss.wav -75}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        ripples_start_time=0\n        ripples_layer=10\n        ripples_y=19\n        [ripples_frame]\n            image=\"halo/ripples/ripple[1~13].png:130\"\n        [/ripples_frame]\n        [frame]\n            image=\"units/monsters/deep-tentacle.png:1300\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        ripples_start_time=0\n        ripples_offset=0.0~1.0\n        ripples_layer=10\n        ripples_y=19\n        [ripples_frame]\n            image=\"halo/ripples/ripple[1,4,7,10,13].png:30\"\n        [/ripples_frame]\n        [frame]\n            image=\"units/monsters/deep-tentacle-melee-defend-1.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Water Serpent": {
    "id": "Water Serpent",
    "image": "units/monsters/water-serpent.png",
    "profile": "portraits/monsters/water-serpent.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n\n        direction=se,sw\n        offset=0\n        start_time=-700\n        [frame]\n            image=units/monsters/water-serpent-attack-se-[1~6].png:[150*3,200,100,150]\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n\n        direction=s\n        offset=0\n        start_time=-700\n        [frame]\n            image=units/monsters/water-serpent-attack-se-[1~4].png:[150*3,200]\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -50}\n        [frame]\n            image=units/monsters/water-serpent-attack-s-[5~6].png:[100,150]\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n\n        direction=ne,nw\n        offset=0\n        start_time=-700\n        [frame]\n            image=units/monsters/water-serpent-attack-ne-[1~6].png:[150*3,200,100,150]\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n\n        direction=n\n        offset=0\n        start_time=-700\n        [frame]\n            image=units/monsters/water-serpent-attack-ne-[1~4].png:[150*3,200]\n        [/frame]\n        {SOUND:HIT_AND_MISS bite-small.ogg {SOUND_LIST:MISS} -50}\n        [frame]\n            image=units/monsters/water-serpent-attack-n-[5~6].png:[100,150]\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        direction=s,sw,se\n        [frame]\n            image=\"units/monsters/water-serpent.png:150\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        direction=n,nw,ne\n        [frame]\n            image=\"units/monsters/water-serpent-n.png:150\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Wild Wyvern": {
    "id": "Wild Wyvern",
    "image": "units/monsters/wyvern/wild-wyvern.png",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=slam\n        [/filter_attack]\n        terrain_type={UNWALKABLE_TERRAINS_TEMP}\n\n        start_time=-200\n\n        [frame]\n            image=\"units/monsters/wyvern/wild-wyvern-fly5.png:300\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS fist.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        terrain_type={UNWALKABLE_TERRAINS_TEMP}\n\n        start_time=-200\n\n        [frame]\n            image=\"units/monsters/wyvern/wild-wyvern-fly4.png:300\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=slam\n        [/filter_attack]\n\n        start_time=-200\n\n        [frame]\n            image=\"units/monsters/wyvern/wild-wyvern.png:300\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS fist.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n\n        start_time=-200\n\n        [frame]\n            image=\"units/monsters/wyvern/wild-wyvern.png:300\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        [frame]\n            image=\"units/monsters/wyvern/wild-wyvern.png:50\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        wyvern_start_time=0\n        terrain_type={UNWALKABLE_TERRAINS_TEMP}\n        submerge=0.01\n        wyvern_y=-4~2:300,2~-4:500\n        # wmlscope: start ignoring\n        [wyvern_frame]\n            image=\"units/monsters/wyvern/wild-wyvern-fly[1~7].png:[100*3,120,130,140,110]\"\n            auto_vflip=no\n            layer=60 # taken from bat, may need adjustment\n            primary=yes\n        [/wyvern_frame]\n        [frame]\n            image=\"units/monsters/wyvern/wild-wyvern-fly-shadow.png:800\"\n        [/frame]\n        # wmlscope: stop ignoring\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        wyvern_start_time=0\n        submerge=0.01\n        wyvern_y=-4~2:300,2~-4:500\n        wyvern_offset=\"0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200,0~1:200\"\n        # wmlscope: start ignoring\n        [wyvern_frame]\n            image=\"units/monsters/wyvern/wild-wyvern-fly[1~7].png:[100*3,120,130,140,110]\"\n            auto_vflip=no\n            layer=60 # taken from bat, may need adjustment\n            primary=yes\n        [/wyvern_frame]\n        [frame]\n            image=\"units/monsters/wyvern/wild-wyvern-fly-shadow.png:800\"\n        [/frame]\n        # wmlscope: stop ignoring\n    [/movement_anim]"
    ]
  },
  "Wolf": {
    "id": "Wolf",
    "image": "units/monsters/wolf.png",
    "profile": "portraits/wolves/wolf-red.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        offset=0.0~-0.1:100,-0.1~0.0:50,0.0~0.3:50,0.3~0.5:100,0.5~0.6:50,0.6~0.4:100,0.4~0.2:50,0.2~0.0:100\n        start_time=-350\n        [frame]\n            image=\"units/monsters/wolf.png:100\"\n            sound={SOUND_LIST:WOLF_GROWL}\n        [/frame]\n        [frame]\n            image=\"units/monsters/wolf-attack.png:200\"\n        [/frame]\n        {SOUND:HIT bite.ogg -100}\n        [frame]\n            image=\"units/monsters/wolf-moving.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/wolf.png:50\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=-50\n        [frame]\n            image=\"units/monsters/wolf.png\"\n            duration=50\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=-50\n        terrain_type=!,*^B*,Kme*^*,!,Chs*^*,Chw*^*,Cm*^*,Km*^*,W*^*,S*^*,*^Vm\n        [frame]\n            image=\"units/monsters/wolf-water.png\"\n            duration=50\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/monsters/wolf-moving.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Direwolf": {
    "id": "Direwolf",
    "image": "units/monsters/direwolf.png",
    "profile": "portraits/wolves/wolf-dark.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        offset=0.0~-0.1:100,-0.1~0.0:50,0.0~0.3:50,0.3~0.5:100,0.5~0.6:50,0.6~0.4:100,0.4~0.2:50,0.2~0.0:100\n        start_time=-350\n        [frame]\n            image=\"units/monsters/direwolf.png:100\"\n            sound={SOUND_LIST:WOLF_GROWL}\n        [/frame]\n        [frame]\n            image=\"units/monsters/direwolf-attack.png:200\"\n        [/frame]\n        {SOUND:HIT bite.ogg -100}\n        [frame]\n            image=\"units/monsters/direwolf-moving.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/direwolf.png:50\"\n        [/frame]\n    [/attack_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/monsters/direwolf-moving.png:150\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Great Wolf": {
    "id": "Great Wolf",
    "image": "units/monsters/wolf-great.png",
    "profile": "portraits/wolves/wolf-great.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fangs\n        [/filter_attack]\n        offset=0.0~-0.1:100,-0.1~0.0:50,0.0~0.3:50,0.3~0.5:100,0.5~0.6:50,0.6~0.4:100,0.4~0.2:50,0.2~0.0:100\n        start_time=-350\n        [frame]\n            image=\"units/monsters/wolf-great.png:100\"\n            sound={SOUND_LIST:WOLF_GROWL}\n        [/frame]\n        [frame]\n            image=\"units/monsters/wolf-great-attack.png:200\"\n        [/frame]\n        {SOUND:HIT bite.ogg -100}\n        [frame]\n            image=\"units/monsters/wolf-great-moving.png:250\"\n        [/frame]\n        [frame]\n            image=\"units/monsters/wolf-great.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=fangs\n            [/filter_attack]\n            offset=0.0~-0.1:100,-0.1~0.0:50,0.0~0.3:50,0.3~0.5:100,0.5~0.6:50,0.6~0.4:100,0.4~0.2:50,0.2~0.0:100\n            start_time=-350\n            [frame]\n                image=\"units/monsters/wolf-great+red.png:100\"\n                sound={SOUND_LIST:WOLF_GROWL}\n            [/frame]\n            [frame]\n                image=\"units/monsters/wolf-great+red-attack.png:200\"\n            [/frame]\n            {SOUND:HIT bite.ogg -100}\n            [frame]\n                image=\"units/monsters/wolf-great+red-moving.png:250\"\n            [/frame]\n            [frame]\n                image=\"units/monsters/wolf-great+red.png:50\"\n            [/frame]\n        [/attack_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/monsters/wolf-great-moving.png:150\"\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n            start_time=0\n            [frame]\n                image=\"units/monsters/wolf-great+red-moving.png:150\"\n            [/frame]\n        [/movement_anim]"
    ]
  },
  "Yeti": {
    "id": "Yeti",
    "image": "units/monsters/yeti.png",
    "profile": "portraits/monsters/yeti.webp",
    "level": "4",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fist\n        [/filter_attack]\n        offset=0.0~-0.1,-0.1~0.4,0.4~0.5,0.5~0.4,0.4~0.2,0.2~0.0\n        start_time=-300\n        [frame]\n            image=\"units/monsters/yeti-attack[1~3].png:[100*2,250]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS fist.ogg {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/monsters/yeti.png:100\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Naga Dirkfang": {
    "id": "Naga Dirkfang",
    "image": "units/nagas/mixed/dirkfang.png",
    "profile": "portraits/nagas/dirkfang.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-540\n        offset=\"0.0:290,0.0~0.6:250,0.6~0.0:400\"\n        [frame]\n            image=\"units/nagas/mixed/dirkfang-melee[1~6].png:[120,160,80*2,100,200]\"\n        [/frame]\n        [frame]\n            image=\"units/nagas/mixed/dirkfang.png:200\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav dagger-swish.wav -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=chakri\n        [/filter_attack]\n        start_time=-800\n        missile_start_time=-150\n        [if]\n            hits=yes\n            [missile_frame]\n                duration=150\n                image=\"projectiles/chakram.png\"\n                offset=0~0.8\n            [/missile_frame]\n            [frame]\n                image=\"units/nagas/mixed/dirkfang-throw[1~10].png:[90,100,120,150,150,100,100,130,130,120]\"\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                duration=200\n                image=\"projectiles/chakram.png\"\n                x=0~7\n                y=0~7\n                offset=0~1.2\n            [/missile_frame]\n            [frame]\n                image=\"units/nagas/mixed/dirkfang-throw[1~10].png:[90,100,120,150,150,100,100,130,130,120]\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS throwing-knife.ogg throw-[1~4].wav -100}\n    [/attack_anim]"
    ]
  },
  "Naga Fighter": {
    "id": "Naga Fighter",
    "image": "units/nagas/fighter/fighter.png",
    "profile": "portraits/nagas/fighter.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        offset=0.0~0.3,0.3~0.5,0.5~0.60,0.60~0.3,0.3~0.0\n        start_time=-450\n        [frame]\n            image=\"units/nagas/fighter/fighter-melee-[1~6].png:[130,100*2,90,80,70]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Naga Guard": {
    "id": "Naga Guard",
    "image": "units/nagas/guardian/guardian.png",
    "profile": "portraits/nagas/naga-mace_warrior1.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace\n        [/filter_attack]\n        offset=0.0~-0.05:250,0.0~0.6:250,0.6~0.0:350\n        start_time=-500\n        [frame]\n            image=\"units/nagas/guardian/guardian-attack-[1~5].png:[120,180,120,130,150]\"\n        [/frame]\n        [frame]\n            image=\"units/nagas/guardian/guardian.png:150\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Naga High Guard": {
    "id": "Naga High Guard",
    "image": "units/nagas/guardian/sentinel.png",
    "profile": "portraits/nagas/naga-mace_warrior3.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace\n        [/filter_attack]\n        start_time=-500\n        offset=0.0:300,0.0~0.6:200,0.6~0.0:300\n        [frame]\n            image=\"units/nagas/guardian/sentinel.png:700\"\n            # image=\"units/nagas/guardian/sentinel-attack-[1~4].png:[100*2,150,200]\"\n        [/frame]\n        [frame]\n            duration=100\n            image=\"units/nagas/guardian/sentinel.png\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Naga Shield Guard": {
    "id": "Naga Shield Guard",
    "image": "units/nagas/guardian/warden.png",
    "profile": "portraits/nagas/naga-mace_warrior2.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=mace\n        [/filter_attack]\n        start_time=-500\n        offset=0.0:300,0.0~0.6:200,0.6~0.0:300\n        [frame]\n            image=\"units/nagas/guardian/warden-attack-[1~6].png:[100,200,100*4]\"\n        [/frame]\n        [frame]\n            duration=100\n            image=\"units/nagas/guardian/warden.png\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=shield\n        [/filter_attack]\n        start_time=-450\n        offset=0.0:250,0.0~0.5:200,0.5~0.0:200\n        [frame]\n            image=\"units/nagas/guardian/warden-shield-attack-[1~3].png:[100*2,150]\"\n        [/frame]\n        [if]\n            hits=yes\n            [frame]\n                image=\"units/nagas/guardian/warden-shield-attack-4.png~BLIT(units/nagas/guardian/warden-shield-swoosh.png):200\"\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [frame]\n                image=\"units/nagas/guardian/warden-shield-attack-4.png:200\"\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/nagas/guardian/warden-shield-attack-2.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Naga Myrmidon": {
    "id": "Naga Myrmidon",
    "image": "units/nagas/fighter/myrmidon.png",
    "profile": "portraits/nagas/myrmidon.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        offset=0.0~0.3,0.3~0.5,0.5~0.60,0.60~0.3,0.3~0.0\n        start_time=-450\n        [frame]\n            image=\"units/nagas/fighter/myrmidon-melee-[1~6].png:[130,100*2,90,80,70]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Naga Ophidian": {
    "id": "Naga Ophidian",
    "image": "units/nagas/mixed/ophidian.png",
    "profile": "portraits/nagas/naga-ophidian.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=curved blade\n        [/filter_attack]\n        start_time=-420\n        offset=0.0:240,0.0~0.6:180,0.6~0.0:250\n        [frame]\n            image=\"units/nagas/mixed/ophidian-melee[1~7].png:[70*4,80*2,180]\"\n        [/frame]\n        [frame]\n            image=\"units/nagas/mixed/ophidian.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=jarid\n        [/filter_attack]\n        start_time=-550\n        missile_start_time=-150\n        [if]\n            hits=yes\n            [missile_frame]\n                duration=150\n                image=\"projectiles/spear-n.png\"\n                image_diagonal=\"projectiles/spear-ne.png\"\n                offset=0~0.8\n            [/missile_frame]\n            [frame]\n                image=\"units/nagas/mixed/ophidian-jarid-[1~7].png:[100*6,80]\"\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                duration=150\n                image=\"projectiles/spear-n.png\"\n                image_diagonal=\"projectiles/spear-ne.png\"\n                offset=0~1.2\n            [/missile_frame]\n            [frame]\n                image=\"units/nagas/mixed/ophidian-jarid-[1~7].png:[100*6,80]\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS spear.ogg throw-[1~4].wav -100}\n    [/attack_anim]"
    ]
  },
  "Naga Ringcaster": {
    "id": "Naga Ringcaster",
    "image": "units/nagas/mixed/ringcaster.png",
    "profile": "portraits/nagas/naga-ringcaster.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=chakram_melee\n        [/filter_attack]\n        start_time=-400\n        offset=0.0:200,0.0~0.6:200,0.6~0.0:300\n        [frame]\n            image=\"units/nagas/mixed/ringcaster-attack-[1~7].png:[80*7]\"\n        [/frame]\n        [frame]\n            image=\"units/nagas/mixed/ringcaster.png:140\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=chakram\n        [/filter_attack]\n        start_time=-560\n        missile_start_time=-150\n        [if]\n            hits=yes\n            [missile_frame]\n                duration=150\n                image=\"projectiles/chakram.png\"\n                image_diagonal=\"projectiles/chakram.png\"\n                offset=0~0.8\n            [/missile_frame]\n            [frame]\n                image=\"units/nagas/mixed/ringcaster-throw-[1~8].png:[80*8]\"\n            [/frame]\n            [frame]\n                image=\"units/nagas/mixed/ringcaster.png:60\"\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                duration=150\n                image=\"projectiles/chakram.png\"\n                image_diagonal=\"projectiles/chakram.png\"\n                offset=0~1.4\n            [/missile_frame]\n            [frame]\n                image=\"units/nagas/mixed/ringcaster-throw-[1~8].png:[80*8]\"\n            [/frame]\n            [frame]\n                image=\"units/nagas/mixed/ringcaster.png:60\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS throwing-knife.ogg throw-[1~4].wav -100}\n    [/attack_anim]"
    ]
  },
  "Naga Sicarius": {
    "id": "Naga Sicarius",
    "image": "units/nagas/mixed/sicarius.png",
    "profile": "portraits/nagas/naga-ophidian.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=curved blade\n        [/filter_attack]\n        start_time=-510\n        offset=0.0:350,0.0~0.6:160,0.6~0.0:290\n        [frame]\n            image=\"units/nagas/mixed/sicarius-attack[1~8].png:[150,100*2,80*5]\"\n        [/frame]\n        [frame]\n            image=\"units/nagas/mixed/sicarius.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=jarid\n        [/filter_attack]\n        start_time=-450\n        missile_start_time=-150\n        [if]\n            hits=yes\n            [missile_frame]\n                duration=150\n                image=\"projectiles/pitchfork-n.png\"\n                image_diagonal=\"projectiles/pitchfork-ne.png\"\n                offset=0~0.8\n            [/missile_frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                duration=150\n                image=\"projectiles/pitchfork-n.png\"\n                image_diagonal=\"projectiles/pitchfork-ne.png\"\n            [/missile_frame]\n        [/else]\n        [frame]\n            image=\"units/nagas/mixed/sicarius-throw[1~6].png:[120,100,80*2,100,120]\"\n        [/frame]\n        [frame]\n            image=\"units/nagas/mixed/sicarius.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:THROW} {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ]
  },
  "Naga Warrior": {
    "id": "Naga Warrior",
    "image": "units/nagas/fighter/warrior.png",
    "profile": "portraits/nagas/myrmidon.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        offset=0.0~0.3,0.3~0.5,0.5~0.60,0.60~0.3,0.3~0.0\n        start_time=-450\n        [frame]\n            image=\"units/nagas/fighter/warrior-melee-[1~6].png:[130,100*2,90,80,70]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Naga Zephyr": {
    "id": "Naga Zephyr",
    "image": "units/nagas/mixed/zephyr.png",
    "profile": "portraits/nagas/naga-ringcaster.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=chakram_melee\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/nagas/mixed/zephyr.png:300\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=chakram\n        [/filter_attack]\n        start_time=-225\n        missile_start_time=-150\n        [if]\n            hits=yes\n            [missile_frame]\n                duration=150\n                image=\"projectiles/chakram.png\"\n                image_diagonal=\"projectiles/chakram.png\"\n                offset=0~0.8\n            [/missile_frame]\n            [frame]\n                image=\"units/nagas/mixed/zephyr.png:300\"\n                sound=hatchet.wav\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [missile_frame]\n                duration=150\n                image=\"projectiles/chakram.png\"\n                image_diagonal=\"projectiles/chakram.png\"\n            [/missile_frame]\n            [frame]\n                image=\"units/nagas/mixed/zephyr.png:300\"\n                sound=hatchet-miss.wav\n            [/frame]\n        [/else]\n    [/attack_anim]"
    ]
  },
  "Ogre": {
    "id": "Ogre",
    "image": "units/ogres/ogre.png",
    "profile": "portraits/monsters/ogre.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=cleaver\n        [/filter_attack]\n        start_time=-325\n        [frame]\n            image=\"units/ogres/ogre-attack[1~5].png:[75,100,75,175,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ]
  },
  "Young Ogre": {
    "id": "Young Ogre",
    "image": "units/ogres/young-ogre.png",
    "profile": "portraits/monsters/young-ogre.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=cleaver\n        [/filter_attack]\n        start_time=-325\n        [frame]\n            image=\"units/ogres/young-ogre-attack[1~5].png:[75,100,75,175,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ]
  },
  "Orcish Archer": {
    "id": "Orcish Archer",
    "image": "units/orcs/archer.png",
    "profile": "portraits/orcs/archer.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n            type=fire\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-fire-n.png\"\n            image_diagonal=\"projectiles/missile-fire-ne.png\"\n        [/missile_frame]\n        [if]\n            hits=no\n        [/if]\n        [else]\n            hits=yes\n\n            missile_offset=0~0.8:150\n            {FIRE_BURST_SMALL}\n        [/else]\n        start_time=-445\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/orcs/archer-bow.png:65\"\n            [/frame]\n            [frame]\n                image=\"units/orcs/archer-bow-attack-[1,2].png:75\"\n            [/frame]\n            [frame]\n                image=\"units/orcs/archer-bow-attack-3.png:100\"\n            [/frame]\n            [frame]\n                image=\"units/orcs/archer-bow-attack-[4,1].png:[130,65]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/orcs/archer-ne.png:60\"\n            [/frame]\n            [frame]\n                image=\"units/orcs/archer-ne-bow-attack-[1~4,1].png:[85*3,95,100]\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS bow-puny-fire.ogg bow-puny-fire-miss.ogg -230}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=bow\n            type=pierce\n        [/filter_attack]\n        start_time=-445\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/orcs/archer-bow.png:65\"\n            [/frame]\n            [frame]\n                image=\"units/orcs/archer-bow-attack-[1~4,1].png:[75*2,100,130,65]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/orcs/archer-ne.png:65\"\n            [/frame]\n            [frame]\n                image=\"units/orcs/archer-ne-bow-attack-[1~4,1].png:[75*2,100,130,65]\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS bow-puny.ogg bow-puny-miss.ogg -230}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-300\n        [frame]\n            image=\"units/orcs/archer-melee.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/archer-melee-[1~6].png:[100*2,75,100*2,75]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -50}\n        [frame]\n            image=\"units/orcs/archer-melee.png:50\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        {WOUNDED_UNIT ()}\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/orcs/archer-bob-[1~6].png:[150*2,200,150*3]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/orcs/archer-ne-bob-[2,1~4,3].png:[190*4,360,190]\"\n            [/frame]\n        [/else]\n    [/standing_anim]"
    ]
  },
  "Orcish Assassin": {
    "id": "Orcish Assassin",
    "image": "units/orcs/assassin.png",
    "profile": "portraits/orcs/assassin.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=throwing knives\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/dagger-n.png\"\n            image_diagonal=\"projectiles/dagger-ne.png\"\n        [/missile_frame]\n        start_time=-250\n        [frame]\n            image=\"units/orcs/assassin-ranged[1,2].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS throwing-knife.ogg throwing-knife-miss.ogg -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-320\n        [frame]\n            image=\"units/orcs/assassin-attack-[1~6].png:[80*4,100*2]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        {WOUNDED_UNIT ()}\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/orcs/assassin-heaving-[1~4,3,2].png:[400*6]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            # need to draw these still\n            [frame]\n                image=\"units/orcs/assassin-heaving-[1~4,3,2].png:[400*6]\"\n                # image=\"units/orcs/assassin-heave-ne-[1~5,4,3,2].png:[200*2,300,200*2,200*3]\"\n            [/frame]\n        [/else]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/orcs/assassin.png:150\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            # need to draw these still\n            [frame]\n                image=\"units/orcs/assassin.png:150\"\n                # image=\"units/orcs/assassin-ne.png:150\n            [/frame]\n        [/else]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        {STANDING_COMBAT_FILTER}\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=units/orcs/assassin-bob-lo.png:350,units/orcs/assassin.png:350\n            [/frame]\n            [frame]\n                image=\"units/orcs/assassin-bob-[hi,hi2,hi].png:[350*3]\"\n            [/frame]\n            [frame]\n                image=units/orcs/assassin.png:350\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            # need to draw these still\n            [frame]\n                image=units/orcs/assassin-bob-lo.png:350,units/orcs/assassin.png:350\n            [/frame]\n            [frame]\n                image=\"units/orcs/assassin-bob-[hi,hi2,hi].png:[350*3]\"\n            [/frame]\n            [frame]\n                image=units/orcs/assassin.png:350\n            [/frame]\n        [/else]\n    [/standing_anim]"
    ]
  },
  "Orcish Crossbowman": {
    "id": "Orcish Crossbowman",
    "image": "units/orcs/xbowman.png",
    "profile": "portraits/orcs/crossbowman.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n            type=fire\n        [/filter_attack]\n        missile_start_time=-150\n        start_time=-300\n        [if]\n            hits=yes\n\n            [missile_frame]\n                duration=150\n                image=\"projectiles/missile-fire-n.png\"\n                image_diagonal=\"projectiles/missile-fire-ne.png\"\n                offset=0~0.8\n            [/missile_frame]\n\n            {FIRE_BURST_SMALL}\n\n            [frame]\n                image=\"units/orcs/xbowman-ranged-1.png:200\"\n                sound=crossbow-fire.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n\n            [missile_frame]\n                duration=150\n                image=\"projectiles/missile-fire-n.png\"\n                image_diagonal=\"projectiles/missile-fire-ne.png\"\n            [/missile_frame]\n\n            [frame]\n                image=\"units/orcs/xbowman-ranged-1.png:200\"\n                sound=crossbow-fire-miss.ogg\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/orcs/xbowman-ranged-2.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n            type=pierce\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-250\n        {SOUND:HIT_AND_MISS crossbow.ogg crossbow-miss.ogg -200}\n        [frame]\n            image=\"units/orcs/xbowman-ranged-[1,2].png:[200,100]\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/xbowman.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=short sword\n        [/filter_attack]\n\n        offset=0.0~0.3,0.3~0.55,0.55~0.3,0.3~0.0\n        start_time=-250\n        [frame]\n            image=\"units/orcs/xbowman-melee.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS knife.ogg {SOUND_LIST:MISS} -150}\n        [frame]\n            image=\"units/orcs/xbowman-melee-attack-[1~4].png:[100*3,150]\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/xbowman-melee.png:100\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/orcs/xbowman.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/xbowman-breeze-[1~5].png:[240*5]\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Orcish Grunt": {
    "id": "Orcish Grunt",
    "image": "units/orcs/grunt.png",
    "profile": "portraits/orcs/grunt.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        offset=0.0~0.15:100,0.15~0.35:100,0.35~0.45:75,0.45~0.5:100,0.5:20,0.5~0.4:30,0.4~0.2:75,0.2~0.0:75\n        start_time=-300\n        [frame]\n            image=\"units/orcs/grunt.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/grunt-defend-1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/grunt-attack-[1~5].png:[100,75,100,50,75]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/orcs/grunt.png:75\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        {WOUNDED_UNIT ()}\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/orcs/grunt-stand-se-[1~5,4,3,2].png:[200*2,300,200*2,200*3]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/orcs/grunt-stand-ne-[1~5,4,3,2].png:[200*2,300,200*2,200*3]\"\n            [/frame]\n        [/else]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=units/orcs/grunt.png:250\n            [/frame]\n            [frame]\n                image=\"units/orcs/grunt-breeze-[1~5,4~1].png:[250*9]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=units/orcs/grunt-ne.png:250\n            [/frame]\n            [frame]\n                image=\"units/orcs/grunt-breeze-ne-[1~5,4~1].png:[250*9]\"\n            [/frame]\n        [/else]\n    [/standing_anim]"
    ]
  },
  "Orcish Leader": {
    "id": "Orcish Leader",
    "image": "units/orcs/leader.png",
    "profile": "portraits/orcs/grunt-6.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-300\n        {SOUND:HIT_AND_MISS crossbow.ogg crossbow-miss.ogg -300}\n        [frame]\n            image=\"units/orcs/leader-ranged-attack-[1~2].png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=sword\n        [/filter_attack]\n        offset=0.0~0.15:100,0.15~0.35:100,0.35~0.45:75,0.45~0.5:100,0.5:20,0.5~0.4:30,0.4~0.2:75,0.2~0.0:75\n        start_time=-300\n        [frame]\n            image=\"units/orcs/leader.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/leader-defend-1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/leader-attack-[1~5].png:[100,75,100,50,75]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/orcs/leader.png:75\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Orcish Nightblade": {
    "id": "Orcish Nightblade",
    "image": "units/orcs/nightblade.png",
    "profile": "portraits/orcs/slayer.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=throwing knives\n        [/filter_attack]\n\n        start_time=-350\n        missile_start_time=-100\n\n        [missile_frame]\n            duration=100\n            image=projectiles/dagger-n.png\n            image_diagonal=projectiles/dagger-ne.png\n        [/missile_frame]\n\n        [frame]\n            image=\"units/orcs/nightblade-throw-se-[1~9].png:100\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS throwing-knife.ogg throwing-knife-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=blade\n        [/filter_attack]\n\n        start_time=-550\n        [frame]\n            image=\"units/orcs/nightblade-attack-se-[1~9].png:100\"\n            #   offset=0.0~0.5:500,0.5~0.0:400\n        [/frame]\n\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=kick\n        [/filter_attack]\n\n        start_time=-500\n        [frame]\n            image=units/orcs/nightblade-kick-se-[1~12].png:[100,150*2,50*4,100*5]\n            offset=0.0~0.1:400,0.1~0.3:100,0.3~0.4:400,0.4~0.0:200\n        [/frame]\n\n        {SOUND:HIT_AND_MISS club.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ]
  },
  "Orcish Ruler": {
    "id": "Orcish Ruler",
    "image": "units/orcs/ruler.png",
    "profile": "portraits/orcs/ruler.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-300\n        {SOUND:HIT_AND_MISS crossbow.ogg crossbow-miss.ogg -300}\n        [frame]\n            image=\"units/orcs/ruler-ranged-attack-[1~2].png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=greatsword\n        [/filter_attack]\n\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-300\n        [frame]\n            image=\"units/orcs/ruler.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/ruler-attack-sword-[1~6].png:[100*2,75,100*3]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/orcs/ruler.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Orcish Slayer": {
    "id": "Orcish Slayer",
    "image": "units/orcs/slayer.png",
    "profile": "portraits/orcs/slayer.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=throwing knives\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/dagger-n.png\"\n            image_diagonal=\"projectiles/dagger-ne.png\"\n        [/missile_frame]\n        start_time=-150\n        [frame]\n            image=\"units/orcs/slayer-ranged[1~2].png:[50,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS throwing-knife.ogg throwing-knife-miss.ogg -150}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-400\n        offset=0.0~0.3:200,0.3~0.7:150,0.7~0.5:150,0.5~0.2:275,0.2~0.0:125\n        [frame]\n            image=\"units/orcs/slayer-attack-[1~14].png:[75*4,50*2,75*5,65,55,50]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/orcs/slayer.png:200\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/slayer-breeze-[1~3,2,1].png:[200*5]\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Orcish Slurbow": {
    "id": "Orcish Slurbow",
    "image": "units/orcs/slurbow.png",
    "profile": "portraits/orcs/slurbow.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n            type=fire\n        [/filter_attack]\n        missile_start_time=-150\n        start_time=-350\n        [if]\n            hits=yes\n\n            [missile_frame]\n                duration=150\n                image=\"projectiles/missile-fire-n.png\"\n                image_diagonal=\"projectiles/missile-fire-ne.png\"\n                offset=0~0.8\n            [/missile_frame]\n\n            {FIRE_BURST_SMALL}\n\n            [frame]\n                image=\"units/orcs/slurbow-ranged.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/orcs/slurbow-ranged-1.png:100\"\n                sound=crossbow-fire.ogg\n            [/frame]\n            [frame]\n                image=\"units/orcs/slurbow-ranged-2.png:250\"\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n\n            [missile_frame]\n                duration=150\n                image=\"projectiles/missile-fire-n.png\"\n                image_diagonal=\"projectiles/missile-fire-ne.png\"\n            [/missile_frame]\n\n            [frame]\n                image=\"units/orcs/slurbow-ranged.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/orcs/slurbow-ranged-1.png:100\"\n                sound=crossbow-fire-miss.ogg\n            [/frame]\n            [frame]\n                image=\"units/orcs/slurbow-ranged-2.png:250\"\n            [/frame]\n        [/else]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n            type=pierce\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/bullet.png\"\n            image_diagonal=\"projectiles/bullet.png\"\n        [/missile_frame]\n        start_time=-350\n        [frame]\n            image=\"units/orcs/slurbow-ranged-[1~2].png:[150,250]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS crossbow.ogg crossbow-miss.ogg -300}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=short sword\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/orcs/slurbow-melee.png:75\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/slurbow-melee-attack-[1~4,2].png:75\"\n        [/frame]\n        {SOUND:HIT_AND_MISS knife.ogg {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/orcs/slurbow-breeze-[1~4,3,2].png:[200*6]\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Orcish Sovereign": {
    "id": "Orcish Sovereign",
    "image": "units/orcs/sovereign.png",
    "profile": "portraits/orcs/sovereign.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-300\n        {SOUND:HIT_AND_MISS crossbow.ogg crossbow-miss.ogg -300}\n        [frame]\n            image=\"units/orcs/sovereign-ranged-attack-[1~2].png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=greatsword\n        [/filter_attack]\n        offset=0.0~0.15:100,0.15~0.35:100,0.35~0.45:75,0.45~0.5:100,0.5:20,0.5~0.4:30,0.4~0.2:75,0.2~0.0:75\n        start_time=-300\n        [frame]\n            image=\"units/orcs/sovereign.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/sovereign-defend-1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/sovereign-attack-[1~5].png:[100,75,100,50,75]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/orcs/sovereign.png:75\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Orcish Warlord": {
    "id": "Orcish Warlord",
    "image": "units/orcs/warlord.png",
    "profile": "portraits/orcs/warlord.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        start_time=-445\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        [frame]\n            image=\"units/orcs/warlord-bow.png:65\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/warlord-bow-attack-[1~4,1].png:[75*2,100,130,65]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -230}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=greatsword\n        [/filter_attack]\n\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-300\n        [frame]\n            image=\"units/orcs/warlord.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/warlord-attack-sword-[1~6].png:[100*2,75,100*2,75]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/orcs/warlord.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Orcish Warrior": {
    "id": "Orcish Warrior",
    "image": "units/orcs/warrior.png",
    "profile": "portraits/orcs/warrior.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=greatsword\n        [/filter_attack]\n        offset=0.0~0.15:100,0.15~0.35:100,0.35~0.45:75,0.45~0.5:100,0.5:20,0.5~0.4:30,0.4~0.2:75,0.2~0.0:75\n        start_time=-300\n        [frame]\n            image=\"units/orcs/warrior.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/warrior-defend-1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/warrior-attack-[1~5].png:[100,75,100,50,75]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/orcs/warrior.png:75\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        {WOUNDED_UNIT ()}\n        [frame]\n            image=\"units/orcs/warrior-bob-[1~3,2].png:[400,280,450,280]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/orcs/warrior.png:200\"\n        [/frame]\n        [frame]\n            image=\"units/orcs/warrior-breeze-[1~5].png:[200*5]\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Saurian Ambusher": {
    "id": "Saurian Ambusher",
    "image": "units/saurians/ambusher/ambusher.png",
    "profile": "portraits/saurians/skirmisher.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=ranged\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            offset=-0.2~1.0\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n\n        start_time=-450\n        throw_sound_start_time=-150\n        sound_start_time=-100\n\n        [throw_sound_frame]\n            sound={SOUND_LIST:THROW}\n        [/throw_sound_frame]\n\n        [if]\n            hits=yes\n            [sound_frame]\n                sound=spear.ogg\n            [/sound_frame]\n        [/if]\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/saurians/ambusher/ambusher-se-throw[1~9].png:100\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/saurians/ambusher/ambusher-ne-throw[1~9].png:100\"\n            [/frame]\n        [/else]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=0\n        {ATTACK_ANIM_QUAD_DIRECTIONAL_10_FRAME \"units/saurians/ambusher/ambusher\" \"melee\" spear.ogg spear-miss.ogg}\n    [/attack_anim]"
    ]
  },
  "Saurian Augur": {
    "id": "Saurian Augur",
    "image": "units/saurians/augur/augur.png",
    "profile": "portraits/saurians/augur.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=curse\n        [/filter_attack]\n        {MISSILE_FRAME_ICE}\n        {MAGIC_ARMRAISE_DIRECTIONAL_2_FRAME  \"units/saurians/augur/augur\"}\n        {HALO_FRAME_SAURIAN}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        direction=s,se,sw\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-250\n        [frame]\n            image=\"units/saurians/augur/augur-se-melee[1~5].png:[150,100*2,90,80]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/saurians/augur/augur-se-defend1.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        direction=n,ne,nw\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-250\n        [frame]\n            image=\"units/saurians/augur/augur-ne-melee[1~5].png:[150,100*2,90,80]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/saurians/augur/augur-ne-defend1.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Saurian Flanker": {
    "id": "Saurian Flanker",
    "image": "units/saurians/flanker/flanker.png",
    "profile": "portraits/saurians/skirmisher.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=ranged\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            offset=-0.2~1.0\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n\n        start_time=-450\n        throw_sound_start_time=-150\n        sound_start_time=-100\n\n        [throw_sound_frame]\n            sound={SOUND_LIST:THROW}\n        [/throw_sound_frame]\n\n        [if]\n            hits=yes\n            [sound_frame]\n                sound=spear.ogg\n            [/sound_frame]\n        [/if]\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/saurians/flanker/flanker-se-throw[1~9].png:100\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/saurians/flanker/flanker-ne-throw[1~9].png:100\"\n            [/frame]\n        [/else]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=0\n        {ATTACK_ANIM_QUAD_DIRECTIONAL_10_FRAME \"units/saurians/flanker/flanker\" \"melee\" spear.ogg spear-miss.ogg}\n    [/attack_anim]"
    ]
  },
  "Saurian Javelineer": {
    "id": "Saurian Javelineer",
    "image": "units/saurians/javelineer/javelineer.png",
    "profile": "portraits/saurians/skirmisher.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=ranged\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            offset=-0.2~1.0\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n\n        start_time=-450\n        throw_sound_start_time=-150\n        sound_start_time=-100\n\n        [throw_sound_frame]\n            sound={SOUND_LIST:THROW}\n        [/throw_sound_frame]\n\n        [if]\n            hits=yes\n            [sound_frame]\n                sound=spear.ogg\n            [/sound_frame]\n        [/if]\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/saurians/javelineer/javelineer-se-throw[1~9].png:100\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/saurians/javelineer/javelineer-ne-throw[1~9].png:100\"\n            [/frame]\n        [/else]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=0\n        {ATTACK_ANIM_QUAD_DIRECTIONAL_10_FRAME \"units/saurians/javelineer/javelineer\" \"melee\" spear.ogg spear-miss.ogg}\n    [/attack_anim]"
    ]
  },
  "Saurian Oracle": {
    "id": "Saurian Oracle",
    "image": "units/saurians/oracle/oracle.png",
    "profile": "portraits/saurians/augur.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=curse\n        [/filter_attack]\n        {MISSILE_FRAME_ICE}\n        {MAGIC_ARMRAISE_DIRECTIONAL_2_FRAME  \"units/saurians/oracle/oracle\"}\n        {HALO_FRAME_SAURIAN}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        direction=s,se,sw\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-250\n        [frame]\n            image=\"units/saurians/oracle/oracle-se-melee[1~5].png:[150,100*2,90,80]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/saurians/oracle/oracle-se-defend1.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        direction=n,ne,nw\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-250\n        [frame]\n            image=\"units/saurians/oracle/oracle-ne-melee[1~6].png:[150,100*2,90,80,50]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n    [/attack_anim]"
    ]
  },
  "Saurian Prophet": {
    "id": "Saurian Prophet",
    "image": "units/saurians/prophet/prophet.png",
    "profile": "portraits/saurians/augur.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=curse\n        [/filter_attack]\n        {MISSILE_FRAME_ICE}\n        {MAGIC_ARMRAISE_DIRECTIONAL_2_FRAME  \"units/saurians/prophet/prophet\"}\n        {HALO_FRAME_SAURIAN}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        direction=s,se,sw\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-250\n        [frame]\n            image=\"units/saurians/prophet/prophet-se-melee[1~5].png:[150,100*2,90,80]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/saurians/prophet/prophet-se-defend1.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        direction=n,ne,nw\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-250\n        [frame]\n            image=\"units/saurians/prophet/prophet-ne-melee[1~6].png:[150,100*2,90,80,50]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n    [/attack_anim]"
    ]
  },
  "Saurian Seer": {
    "id": "Saurian Seer",
    "image": "units/saurians/seer/seer.png",
    "profile": "portraits/saurians/augur.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=curse\n        [/filter_attack]\n        {MISSILE_FRAME_ICE}\n        {MAGIC_ARMRAISE_DIRECTIONAL_2_FRAME  \"units/saurians/seer/seer\"}\n        {HALO_FRAME_SAURIAN}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        direction=s,se,sw\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-250\n        [frame]\n            image=\"units/saurians/seer/seer-se-melee[1~5].png:[150,100*2,90,80]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/saurians/seer/seer-se-defend1.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        direction=n,ne,nw\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-250\n        [frame]\n            image=\"units/saurians/seer/seer-ne-melee[1~5].png:[150,100*2,90,80]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/saurians/seer/seer-ne-defend1.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Saurian Skirmisher": {
    "id": "Saurian Skirmisher",
    "image": "units/saurians/skirmisher/skirmisher.png",
    "profile": "portraits/saurians/skirmisher.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=ranged\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            offset=-0.2~1.0\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n\n        start_time=-450\n        throw_sound_start_time=-150\n        sound_start_time=-100\n\n        [throw_sound_frame]\n            sound={SOUND_LIST:THROW}\n        [/throw_sound_frame]\n\n        [if]\n            hits=yes\n            [sound_frame]\n                sound=spear.ogg\n            [/sound_frame]\n        [/if]\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/saurians/skirmisher/skirmisher-se-throw[1~9].png:100\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/saurians/skirmisher/skirmisher-ne-throw[1~9].png:100\"\n            [/frame]\n        [/else]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=0\n        {ATTACK_ANIM_QUAD_DIRECTIONAL_10_FRAME \"units/saurians/skirmisher/skirmisher\" \"melee\" spear.ogg spear-miss.ogg}\n    [/attack_anim]"
    ]
  },
  "Saurian Soothsayer": {
    "id": "Saurian Soothsayer",
    "image": "units/saurians/soothsayer/soothsayer.png",
    "profile": "portraits/saurians/augur.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=curse\n        [/filter_attack]\n        {MISSILE_FRAME_ICE}\n        {MAGIC_ARMRAISE_DIRECTIONAL_2_FRAME  \"units/saurians/soothsayer/soothsayer\"}\n        {HALO_FRAME_SAURIAN}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        direction=s,se,sw\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-250\n        [frame]\n            image=\"units/saurians/soothsayer/soothsayer-se-melee[1~5].png:[150,100*2,90,80]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/saurians/soothsayer/soothsayer-se-defend1.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        direction=n,ne,nw\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-250\n        [frame]\n            image=\"units/saurians/soothsayer/soothsayer-ne-melee[1~5].png:[150,100*2,90,80]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/saurians/soothsayer/soothsayer-ne-defend1.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Saurian Spearthrower": {
    "id": "Saurian Spearthrower",
    "image": "units/saurians/spearthrower/spearthrower.png",
    "profile": "portraits/saurians/skirmisher.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=ranged\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            offset=-0.2~1.0\n            image=\"projectiles/spear-n.png\"\n            image_diagonal=\"projectiles/spear-ne.png\"\n        [/missile_frame]\n\n        start_time=-450\n        throw_sound_start_time=-150\n        sound_start_time=-100\n\n        [throw_sound_frame]\n            sound={SOUND_LIST:THROW}\n        [/throw_sound_frame]\n\n        [if]\n            hits=yes\n            [sound_frame]\n                sound=spear.ogg\n            [/sound_frame]\n        [/if]\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/saurians/spearthrower/spearthrower-se-throw[1~9].png:100\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/saurians/spearthrower/spearthrower-ne-throw[1~9].png:100\"\n            [/frame]\n        [/else]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=spear\n            range=melee\n        [/filter_attack]\n\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=0\n        {ATTACK_ANIM_QUAD_DIRECTIONAL_10_FRAME \"units/saurians/spearthrower/spearthrower\" \"melee\" spear.ogg spear-miss.ogg}\n    [/attack_anim]"
    ]
  },
  "my_first_unit": {
    "id": "my_first_unit",
    "image": "units/undead-skeletal/bone-shooter.png",
    "profile": "portraits/undead/bone-shooter.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/bone-n.png\"\n            image_diagonal=\"projectiles/bone-ne.png\"\n        [/missile_frame]\n        start_time=-445\n        [frame]\n            image=\"units/undead-skeletal/bone-shooter-bow.png:65\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/bone-shooter-bow-attack-[1~4].png:[75*2,100,130]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}\n        [frame]\n            image=\"units/undead-skeletal/bone-shooter-bow.png:65\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-275\n        [frame]\n            image=\"units/undead-skeletal/bone-shooter-melee-defend-1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/bone-shooter-melee-attack-[1~4].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -125}\n        [frame]\n            image=\"units/undead-skeletal/bone-shooter-melee-defend-1.png:50\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/undead-skeletal/bone-shooter-bob-[1~8].png:[150*3,200,150*4]\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Great Troll": {
    "id": "Great Troll",
    "image": "units/trolls/great-troll.png",
    "profile": "portraits/trolls/troll-hero.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=hammer\n        [/filter_attack]\n        start_time=-300\n        offset=0.0~-0.05:120,-0.05~0.65:180,0.65~0.0:300\n        [frame]\n            image=\"units/trolls/great-troll.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/trolls/great-troll-attack-[1~5,1].png:[80,75,70,80,210,60]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]"
    ]
  },
  "Troll Hero": {
    "id": "Troll Hero",
    "image": "units/trolls/troll-hero.png",
    "profile": "portraits/trolls/troll-hero.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=hammer\n        [/filter_attack]\n\n        direction=se,sw\n        offset=0.0~0.1,0.1~0.0\n        start_time=-300\n\n        [frame]\n            image=units/trolls/troll-hero-attack-se-[1~6].png:100\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=hammer\n        [/filter_attack]\n\n        direction=s\n        offset=0.0~0.1:300,0.1~0.2:200,0.2~0.0:100\n        start_time=-300\n\n        [frame]\n            image=units/trolls/troll-hero-attack-se-[1~6].png:100\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=hammer\n        [/filter_attack]\n\n        direction=nw,n,ne\n        offset=0.0~0.1,0.1~0.0\n        start_time=-300\n\n        [frame]\n            image=units/trolls/troll-hero-attack-se-1.png:100,units/trolls/troll-hero-attack-ne-[2~6].png:[100*2,75*3]\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n        [frame]\n            image=units/trolls/troll-hero-attack-se-1.png:75\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Troll Rocklobber": {
    "id": "Troll Rocklobber",
    "image": "units/trolls/lobber.png",
    "profile": "portraits/trolls/troll-rocklobber.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=sling\n        [/filter_attack]\n\n        start_time=-1000\n        offset=0\n\n        sling_stone_start_time=-800\n        [if]\n            hits=yes\n            [sling_stone_frame]\n                halo=\"projectiles/stone-large.png:800\"\n                halo_x=24~0\n                halo_y=0~-10,-10~-18,-18~-22,-22~-24,-24~-25,-25~-24,-24~-22,-22~-18,-18~-10,-10~-0\n                offset=0.0~1.0\n            [/sling_stone_frame]\n\n            [frame]\n                image=\"units/trolls/lobber-attack-ranged1.png:200\"\n                sound=sling-big.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=no\n            [sling_stone_frame]\n                halo=\"projectiles/stone-large.png:900\"\n                halo_x=24~0\n                halo_y=0~-10,-10~-16,-16~-20,-20~-22,-22~-20,-20~-16,-16~-10,-10~0,0~-4,-4~0,0~-2,-2~0\n                offset=0.0~1.5\n            [/sling_stone_frame]\n\n            [frame]\n                image=\"units/trolls/lobber-attack-ranged1.png:200\"\n                sound=sling-big-miss.ogg\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/trolls/lobber-attack-ranged2.png:600\"\n        [/frame]\n        [frame]\n            image=\"units/trolls/lobber-defend.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/trolls/lobber.png:100\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fist\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/trolls/lobber.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/trolls/lobber-attack-melee.png:250\"\n        [/frame]\n        {SOUND:HIT_AND_MISS fist.ogg {SOUND_LIST:MISS} -150}\n        [frame]\n            image=\"units/trolls/lobber.png:100\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Troll": {
    "id": "Troll",
    "image": "units/trolls/grunt.png",
    "profile": "portraits/trolls/troll.png",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=club\n        [/filter_attack]\n        start_time=-300\n        [frame]\n            image=\"units/trolls/grunt.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/trolls/grunt-attack-[1~4,3].png:[75*3,95,80]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS club.ogg {SOUND_LIST:MISS} -200}\n        [frame]\n            image=\"units/trolls/grunt-defend.png:75\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Troll Shaman": {
    "id": "Troll Shaman",
    "image": "units/trolls/shaman.png",
    "profile": "portraits/trolls/troll-shaman.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=flame blast\n        [/filter_attack]\n\n        start_time=-400\n        offset=0.0\n\n        flame_burst_1_start_time=-400\n        flame_burst_2_start_time=-350\n        flame_burst_3_start_time=-300\n        flame_burst_4_start_time=-250\n        flame_burst_5_start_time=-200\n\n        [flame_burst_1_frame]\n            halo=halo/flame-burst-[1~8].png:50\n            halo_x,halo_y=-22,0\n            offset=1.0\n            auto_vflip=no\n        [/flame_burst_1_frame]\n        [flame_burst_2_frame]\n            halo=halo/flame-burst-[1~8].png:50\n            halo_x,halo_y=-14,9\n            offset=1.0\n            auto_vflip=no\n        [/flame_burst_2_frame]\n        [flame_burst_3_frame]\n            halo=halo/flame-burst-[1~8].png:50\n            halo_x,halo_y=0,12\n            offset=1.0\n            auto_vflip=no\n        [/flame_burst_3_frame]\n        [flame_burst_4_frame]\n            halo=halo/flame-burst-[1~8].png:50\n            halo_x,halo_y=14,9\n            offset=1.0\n            auto_vflip=no\n        [/flame_burst_4_frame]\n        [flame_burst_5_frame]\n            halo=halo/flame-burst-[1~8].png:50\n            halo_x,halo_y=22,0\n            offset=1.0\n            auto_vflip=no\n        [/flame_burst_5_frame]\n\n        [frame]\n            sound=fire.wav\n            image=units/trolls/shaman-ranged-1.png:100\n        [/frame]\n        [frame]\n            image=units/trolls/shaman-ranged-[2,3~1].png:[100,200,100*2]\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fist\n        [/filter_attack]\n        offset=0.0~0.3,0.3~0.5,0.5~0.60,0.60~0.3,0.3~0.0\n        start_time=-300\n        {SOUND:HIT_AND_MISS fist.ogg {SOUND_LIST:MISS} -100}\n        [frame]\n            image=units/trolls/shaman-fist-[1~5].png:100\n        [/frame]\n        [frame]\n            image=units/trolls/shaman.png:50\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Troll Warrior": {
    "id": "Troll Warrior",
    "image": "units/trolls/warrior.png",
    "profile": "portraits/trolls/troll-warrior.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=hammer\n        [/filter_attack]\n        start_time=-300\n        [frame]\n            image=\"units/trolls/warrior.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/trolls/warrior-attack-[1~4,3,1].png:[75,50,75,175,75,25]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS mace.ogg mace-miss.ogg -100}\n        [frame]\n            image=\"units/trolls/warrior.png:50\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/trolls/warrior-breeze-s-[1~3,2].png:290\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        {WOUNDED_UNIT ()}\n        [frame]\n            image=\"units/trolls/warrior-bob-s-[1~4,3,2].png:[620,420,310,620,420,510]\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Troll Whelp": {
    "id": "Troll Whelp",
    "image": "units/trolls/whelp.png",
    "profile": "portraits/trolls/whelp.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=fist\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/trolls/whelp-attack-[1~3,1].png:[100,125,100,75]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS fist.ogg {SOUND_LIST:MISS} -150}\n        [frame]\n            image=\"units/trolls/whelp.png:50\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        {WOUNDED_UNIT ()}\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/trolls/whelp.png:2200\"\n            [/frame]\n            [frame]\n                image=\"units/trolls/whelp-bob-se-[1,2,1].png:[320,400,650]\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/trolls/whelp-ne.png:2200\"\n            [/frame]\n            [frame]\n                image=\"units/trolls/whelp-bob-ne-[1,2,1].png:[320,400,650]\"\n            [/frame]\n        [/else]\n    [/standing_anim]"
    ]
  },
  "Ghast": {
    "id": "Ghast",
    "image": "units/undead/ghast.png",
    "profile": "portraits/undead/ghoul.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bite\n        [/filter_attack]\n        start_time=-450\n        [frame]\n            image=\"units/undead/ghast-attack-[1~6].png:[100,150,100*4]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bite.ogg {SOUND_LIST:MISS} -350}\n    [/attack_anim]"
    ]
  },
  "Ghoul": {
    "id": "Ghoul",
    "image": "units/undead/ghoul.png",
    "profile": "portraits/undead/ghoul.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/undead/ghoul.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/undead/ghoul-attack-[1~4].png:[75*2,100,75]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/undead/ghoul.png:75\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Necrophage": {
    "id": "Necrophage",
    "image": "units/undead/necrophage.png",
    "profile": "portraits/undead/ghoul.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/undead/necrophage.png:50\"\n        [/frame]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/undead/necrophage-attack-[1~4].png:[75*2,100,75]\"\n        [/frame]\n        [frame]\n            image=\"units/undead/necrophage.png:75\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Soulless": {
    "id": "Soulless",
    "image": "units/undead/soulless.png",
    "profile": "portraits/undead/soulless.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=touch\n        [/filter_attack]\n        direction=s\n        start_time=-200\n        [frame]\n            image=\"units/undead/{BASE_NAME}-attack-s.png{IPF}:400\"\n            sound=zombie-attack.wav\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=touch\n        [/filter_attack]\n        direction=n\n        start_time=-200\n        [frame]\n            image=\"units/undead/{BASE_NAME}-attack-n.png{IPF}:400\"\n            sound=zombie-attack.wav\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=touch\n        [/filter_attack]\n        direction=se,sw,ne,nw\n        start_time=-200\n        [frame]\n            image=\"units/undead/{BASE_NAME}-attack.png{IPF}:400\"\n            sound=zombie-attack.wav\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=touch\n            [/filter_attack]\n            direction=s,se,sw\n            offset=0.0~0.9:200,0.9~0.0:160\n            start_time=-200\n            [frame]\n                image=\"units/undead/soulless-bat-se-[3,2].png:30\"\n            [/frame]\n            [frame]\n                image=\"units/undead/soulless-bat-se-1.png:30\"\n                sound=bat-flapping.wav\n            [/frame]\n            [frame]\n                image=\"units/undead/soulless-bat-se-[2,3].png:30\"\n            [/frame]\n            [frame]\n                image=\"units/undead/soulless-bat-se-4.png:70\"\n                sound=zombie-attack.wav\n            [/frame]\n            [frame]\n                image=\"units/undead/soulless-bat-se-[3,2,3].png:[50*2,40]\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=touch\n            [/filter_attack]\n            direction=n,ne,nw\n            offset=0.0~0.9:200,0.9~0.0:160\n            start_time=-200\n            [frame]\n                image=\"units/undead/soulless-bat-ne-[3,2].png:30\"\n            [/frame]\n            [frame]\n                image=\"units/undead/soulless-bat-ne-1.png:30\"\n                sound=bat-flapping.wav\n            [/frame]\n            [frame]\n                image=\"units/undead/soulless-bat-ne-[2,3].png:30\"\n            [/frame]\n            [frame]\n                image=\"units/undead/soulless-bat-ne-4.png:70\"\n                sound=zombie-attack.wav\n            [/frame]\n            [frame]\n                image=\"units/undead/soulless-bat-ne-[3,2,3].png:[50*2,40]\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            __remove=yes\n        [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        [filter]\n            #included are the base unit and variation=\"mounted\"\n            [not]\n                variation=\"ant,bat,beast_rider,boar,bug,drake,dwarf,falcon,fish,goblin,gryphon,horse,rat,sand_scorpion,saurian,scorpion,serpent,spider,swimmer,troll,wolf,wose\"\n            [/not]\n        [/filter]\n        start_time=0\n        [frame]\n            image=\"units/undead/{BASE_NAME}-standing-[1~7,2].png{IPF}:[1900,980,600,530,450,780,420,720]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        [filter]\n            #excluded are the base unit and variation=\"mounted\" (animation directly above) and variation=\"bat,falcon\" (animation further down)\n            variation=\"ant,beast_rider,boar,bug,drake,dwarf,fish,goblin,gryphon,horse,rat,sand_scorpion,saurian,scorpion,serpent,spider,swimmer,troll,wolf,wose\"\n        [/filter]\n        start_time=0\n        [frame]\n            image=\"units/undead/{BASE_NAME}.png{IPF}:150\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n            start_time=0\n            bird_start_time=0\n            bird_y=0~-3:400,-3~3:800,3~0:400\n            [frame]\n                image=\"units/undead/zombie-falcon-shadow.png:1600\"\n            [/frame]\n            [bird_frame]\n                image=\"units/undead/soulless-falcon.png:1600\"\n                auto_vflip=no\n                primary=yes\n            [/bird_frame]\n        [/standing_anim]",
      "[standing_anim] # Remove inherited standing animation first, since merging with it wouldn't work right\n            __remove=yes\n        [/standing_anim]",
      "[standing_anim] # Remove inherited standing animation first, since merging with it wouldn't work right\n            __remove=yes\n        [/standing_anim]",
      "[standing_anim]\n            direction=s,se,sw\n            start_time=0\n            [frame]\n                image=\"units/undead/soulless-bat-se-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n            [/frame]\n        [/standing_anim]",
      "[standing_anim]\n            direction=n,ne,nw\n            start_time=0\n            [frame]\n                image=\"units/undead/soulless-bat-ne-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n            [/frame]\n        [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n            start_time=0\n            [frame]\n                image=\"units/undead/zombie-falcon-shadow.png~BLIT(units/undead/soulless-falcon.png):150\"\n            [/frame]\n        [/movement_anim]",
      "[movement_anim]\n            start_time=0\n            [frame]\n                image=\"units/monsters/gryphon-flying-[1~8].png~CS(-80,0,-10):150\"\n            [/frame]\n        [/movement_anim]"
    ]
  },
  "Walking Corpse": {
    "id": "Walking Corpse",
    "image": "units/undead/zombie.png",
    "profile": "portraits/undead/walking-corpse.webp",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=touch\n        [/filter_attack]\n        direction=s\n        start_time=-200\n        [frame]\n            image=\"units/undead/{BASE_NAME}-attack-s.png~{IPF}({ARG}):400\"\n            sound=zombie-attack.wav\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=touch\n        [/filter_attack]\n        direction=n\n        start_time=-200\n        [frame]\n            image=\"units/undead/{BASE_NAME}-attack-n.png~{IPF}({ARG}):400\"\n            sound=zombie-attack.wav\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=touch\n        [/filter_attack]\n        direction=se,sw,ne,nw\n        start_time=-200\n        [frame]\n            image=\"units/undead/{BASE_NAME}-attack.png~{IPF}({ARG}):400\"\n            sound=zombie-attack.wav\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=touch\n            [/filter_attack]\n            direction=s,se,sw\n            offset=0.0~0.9:200,0.9~0.0:160\n            start_time=-200\n            [frame]\n                image=\"units/undead/zombie-bat-se-[3,2].png:30\"\n            [/frame]\n            [frame]\n                image=\"units/undead/zombie-bat-se-1.png:30\"\n                sound=bat-flapping.wav\n            [/frame]\n            [frame]\n                image=\"units/undead/zombie-bat-se-[2,3].png:30\"\n            [/frame]\n            [frame]\n                image=\"units/undead/zombie-bat-se-4.png:70\"\n                sound=zombie-attack.wav\n            [/frame]\n            [frame]\n                image=\"units/undead/zombie-bat-se-[3,2,3].png:[50*2,40]\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=touch\n            [/filter_attack]\n            direction=n,ne,nw\n            offset=0.0~0.9:200,0.9~0.0:160\n            start_time=-200\n            [frame]\n                image=\"units/undead/zombie-bat-ne-[3,2].png:30\"\n            [/frame]\n            [frame]\n                image=\"units/undead/zombie-bat-ne-1.png:30\"\n                sound=bat-flapping.wav\n            [/frame]\n            [frame]\n                image=\"units/undead/zombie-bat-ne-[2,3].png:30\"\n            [/frame]\n            [frame]\n                image=\"units/undead/zombie-bat-ne-4.png:70\"\n                sound=zombie-attack.wav\n            [/frame]\n            [frame]\n                image=\"units/undead/zombie-bat-ne-[3,2,3].png:[50*2,40]\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            __remove=yes\n        [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        [filter]\n            #included are the base unit and variation=\"mounted\"\n            [not]\n                variation=\"ant,bat,beast_rider,boar,bug,drake,dwarf,falcon,fish,goblin,gryphon,horse,rat,sand_scorpion,saurian,scorpion,serpent,spider,swimmer,troll,wolf,wose\"\n            [/not]\n        [/filter]\n        start_time=0\n        [frame]\n            image=\"units/undead/{BASE_NAME}-standing-[1~7,2].png~{IPF}({ARG}):[580,980,600,430,350*2,420,720]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        #excluded are the base unit and variation=\"mounted\" (animation directly above) and variation=\"bat,falcon\" (animation further down)\n        [filter]\n            variation=\"ant,beast_rider,boar,bug,drake,dwarf,fish,goblin,gryphon,horse,rat,sand_scorpion,saurian,scorpion,serpent,spider,swimmer,troll,wolf,wose\"\n        [/filter]\n        start_time=0\n        [frame]\n            image=\"units/undead/{BASE_NAME}.png~{IPF}({ARG}):150\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n            start_time=0\n            bird_start_time=0\n            bird_y=0~-3:400,-3~3:800,3~0:400\n            [frame]\n                image=\"units/undead/zombie-falcon-shadow.png:1600\"\n            [/frame]\n            [bird_frame]\n                image=\"units/undead/zombie-falcon.png:1600\"\n                auto_vflip=no\n                primary=yes\n            [/bird_frame]\n        [/standing_anim]",
      "[standing_anim] # Remove inherited standing animation first, since merging with it wouldn't work right\n            __remove=yes\n        [/standing_anim]",
      "[standing_anim] # Remove inherited standing animation first, since merging with it wouldn't work right\n            __remove=yes\n        [/standing_anim]",
      "[standing_anim]\n            direction=s,se,sw\n            start_time=0\n            [frame]\n                image=\"units/undead/zombie-bat-se-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n            [/frame]\n        [/standing_anim]",
      "[standing_anim]\n            direction=n,ne,nw\n            start_time=0\n            [frame]\n                image=\"units/undead/zombie-bat-ne-[3~1,2~5,4].png:[50,60,80,60,50,60,80,60]\"\n            [/frame]\n        [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n            start_time=0\n            [frame]\n                image=\"units/undead/zombie-falcon-shadow.png~BLIT(units/undead/zombie-falcon.png):150\"\n            [/frame]\n        [/movement_anim]",
      "[movement_anim]\n            start_time=0\n            [frame]\n                image=\"units/monsters/gryphon-flying-[1~8].png~CS(-50,5,5):150\"\n            [/frame]\n        [/movement_anim]"
    ]
  },
  "Necromancer": {
    "id": "Necromancer",
    "image": "units/undead-necromancers/necromancer.png",
    "profile": "portraits/humans/necromancer.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=chill wave\n        [/filter_attack]\n\n        {MISSILE_FRAME_CHILL_WAVE 0 -5}\n\n        start_time=-355\n        [frame]\n            image=\"units/undead-necromancers/necromancer-magic-[1,2].png:75\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/necromancer-magic-3.png\"\n            halo=halo/undead/black-magic-[1~5].png:[75*4,50]\n        [/frame]\n        {SOUND:HIT_AND_MISS magic-dark.ogg magic-dark-miss.ogg -120}\n        [frame]\n            image=\"units/undead-necromancers/necromancer-magic-[2,1].png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=shadow wave\n        [/filter_attack]\n\n        {MISSILE_FRAME_SHADOW_WAVE}\n\n        start_time=-675\n        [frame]\n            image=\"units/undead-necromancers/necromancer-magic-[1,2].png:75\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/necromancer-magic-3.png\"\n            halo=halo/undead/black-magic-[1~5].png:[75*4,50]\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/necromancer-magic-3.png:250\"\n        [/frame]\n        {SOUND:HIT_AND_MISS magic-dark-big.ogg magic-dark-big-miss.ogg -50}\n        [frame]\n            image=\"units/undead-necromancers/necromancer-magic-[2,1].png:50\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/necromancer.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=plague staff\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/undead-necromancers/necromancer.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/necromancer-attack-staff-[1~2].png:[100,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/undead-necromancers/necromancer-magic-1.png:75\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/necromancer.png:75\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=chill wave\n            [/filter_attack]\n            [frame]\n                image=\"units/undead-necromancers/necromancer+female-magic-[1,2].png:75\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/necromancer+female-magic-3.png\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/necromancer+female-magic-[2,1].png:50\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=shadow wave\n            [/filter_attack]\n            [frame]\n                image=\"units/undead-necromancers/necromancer+female-magic-[1,2].png:75\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/necromancer+female-magic-3.png\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/necromancer+female-magic-3.png:250\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/necromancer+female-magic-[2,1].png:50\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/necromancer+female.png:50\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=plague staff\n            [/filter_attack]\n            [frame]\n                image=\"units/undead-necromancers/necromancer+female.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/necromancer+female-attack-staff-[1~2].png:[100,200]\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/necromancer+female-magic-1.png:75\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/necromancer+female.png:75\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Ancient Lich": {
    "id": "Ancient Lich",
    "image": "units/undead-necromancers/ancient-lich.png",
    "profile": "portraits/undead/ancient-lich.webp",
    "level": "4",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=chill tempest\n        [/filter_attack]\n\n        offset=0\n\n        {MISSILE_FRAME_CHILL_TEMPEST 0 -15}\n\n        start_time=-355\n        [frame]\n            image=\"units/undead-necromancers/ancient-lich-magic-[1,2].png:75\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/ancient-lich-magic-3.png\"\n            halo=halo/undead/black-magic-[1~5].png:[75*4,50]\n        [/frame]\n        {SOUND:HIT_AND_MISS magic-dark-big.ogg magic-dark-big-miss.ogg -150}\n        [frame]\n            image=\"units/undead-necromancers/ancient-lich-magic-[2,1].png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=shadow wave\n        [/filter_attack]\n\n        {MISSILE_FRAME_SHADOW_WAVE}\n\n        start_time=-675\n        [frame]\n            image=\"units/undead-necromancers/ancient-lich-magic-[1,2].png:75\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/ancient-lich-magic-3.png\"\n            halo=halo/undead/black-magic-[1~5].png:[75*4,50]\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/ancient-lich-magic-3.png:200\"\n        [/frame]\n        {SOUND:HIT_AND_MISS magic-dark-big.ogg magic-dark-big-miss.ogg -50}\n        [frame]\n            image=\"units/undead-necromancers/ancient-lich-magic-[2,1].png:50\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/ancient-lich.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=touch\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/undead-necromancers/ancient-lich.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/ancient-lich-melee-[1~2].png:[100,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS wail-sml.wav {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/undead-necromancers/ancient-lich-magic-1.png:75\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/ancient-lich.png:75\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Dark Adept": {
    "id": "Dark Adept",
    "image": "units/undead-necromancers/adept.png",
    "profile": "portraits/humans/dark-adept.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=chill wave\n        [/filter_attack]\n\n        {MISSILE_FRAME_CHILL_WAVE 0 -12}\n\n        start_time=-450\n        [frame]\n            image=\"units/undead-necromancers/adept.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/adept-magic-[1~3].png:[35,75,15]\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/adept-magic-3.png\"\n            halo=halo/undead/dark-magic-[1~6].png:50\n            halo_x,halo_y=0,-12\n        [/frame]\n        {SOUND:HIT_AND_MISS magic-dark.ogg magic-dark-miss.ogg -100}\n        [frame]\n            image=\"units/undead-necromancers/adept-magic-[2,1].png:50\"\n        [/frame]\n        [frame]\n            duration=60\n            image=\"units/undead-necromancers/adept.png\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=shadow wave\n        [/filter_attack]\n\n        {MISSILE_FRAME_SHADOW_WAVE}\n\n        start_time=-700\n        [frame]\n            image=\"units/undead-necromancers/adept.png:25\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/adept-magic-[1~3].png:[35,75,15]\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/adept-magic-3.png\"\n            halo=halo/undead/dark-magic-[1~6].png:50\n            halo_x,halo_y=0,-12~12\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/adept-magic-3.png:350\"\n        [/frame]\n        {SOUND:HIT_AND_MISS magic-dark-big.ogg magic-dark-big-miss.ogg -50}\n        [frame]\n            image=\"units/undead-necromancers/adept-magic-[2,1].png:50\"\n        [/frame]\n        [frame]\n            duration=50\n            image=\"units/undead-necromancers/adept.png\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=chill wave\n            [/filter_attack]\n            [frame]\n                image=\"units/undead-necromancers/adept+female.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/adept+female-magic-[1~3].png:[35,75,20]\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/adept+female-magic-3.png\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/adept+female-magic-[2,1].png:50\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/adept+female.png\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=shadow wave\n            [/filter_attack]\n            [frame]\n                image=\"units/undead-necromancers/adept+female.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/adept+female-magic-[1~3].png:[35,75,15]\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/adept+female-magic-3.png\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/adept+female-magic-3.png:350\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/adept+female-magic-[2,1].png:50\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/adept+female.png\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Dark Sorcerer": {
    "id": "Dark Sorcerer",
    "image": "units/undead-necromancers/dark-sorcerer.png",
    "profile": "portraits/humans/necromancer.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=chill wave\n        [/filter_attack]\n\n        {MISSILE_FRAME_CHILL_WAVE 0 -5}\n\n        start_time=-355\n        [frame]\n            image=\"units/undead-necromancers/dark-sorcerer-magic-[1,2].png:75\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/dark-sorcerer-magic-3.png\"\n            halo=halo/undead/black-magic-[1~5].png:[75*4,50]\n        [/frame]\n        {SOUND:HIT_AND_MISS magic-dark.ogg magic-dark-miss.ogg -120}\n        [frame]\n            image=\"units/undead-necromancers/dark-sorcerer-magic-[2,1].png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=shadow wave\n        [/filter_attack]\n\n        {MISSILE_FRAME_SHADOW_WAVE}\n\n        start_time=-675\n        [frame]\n            image=\"units/undead-necromancers/dark-sorcerer-magic-[1,2].png:75\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/dark-sorcerer-magic-3.png\"\n            halo=halo/undead/black-magic-[1~5].png:[75*4,50]\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/dark-sorcerer-magic-3.png:200\"\n        [/frame]\n        {SOUND:HIT_AND_MISS magic-dark-big.ogg magic-dark-big-miss.ogg -50}\n        [frame]\n            image=\"units/undead-necromancers/dark-sorcerer-magic-[2,1].png:50\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/dark-sorcerer.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=staff\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/undead-necromancers/dark-sorcerer.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/dark-sorcerer-attack-staff-[1~2].png:[100,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS staff.ogg staff-miss.ogg -125}\n        [frame]\n            image=\"units/undead-necromancers/dark-sorcerer-magic-1.png:75\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/dark-sorcerer.png:75\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=chill wave\n            [/filter_attack]\n            [frame]\n                image=\"units/undead-necromancers/dark-sorcerer+female-magic-[1,2].png:75\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/dark-sorcerer+female-magic-3.png\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/dark-sorcerer+female-magic-[2,1].png:50\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=shadow wave\n            [/filter_attack]\n            [frame]\n                image=\"units/undead-necromancers/dark-sorcerer+female-magic-[1,2].png:75\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/dark-sorcerer+female-magic-3.png\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/dark-sorcerer+female-magic-3.png:200\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/dark-sorcerer+female-magic-[2,1].png:50\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/dark-sorcerer+female.png:50\"\n            [/frame]\n        [/attack_anim]",
      "[attack_anim]\n            [filter_attack]\n                name=staff\n            [/filter_attack]\n            [frame]\n                image=\"units/undead-necromancers/dark-sorcerer+female.png:50\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/dark-sorcerer+female-attack-staff-[1~2].png:[100,200]\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/dark-sorcerer+female-magic-1.png:75\"\n            [/frame]\n            [frame]\n                image=\"units/undead-necromancers/dark-sorcerer+female.png:75\"\n            [/frame]\n        [/attack_anim]"
    ]
  },
  "Lich": {
    "id": "Lich",
    "image": "units/undead-necromancers/lich.png",
    "profile": "portraits/undead/lich.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=chill tempest\n        [/filter_attack]\n\n        offset=0\n\n        {MISSILE_FRAME_CHILL_TEMPEST 0 -15}\n\n        start_time=-355\n        [frame]\n            image=\"units/undead-necromancers/lich-magic-[1,2].png:75\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/lich-magic-3.png\"\n            halo=halo/undead/black-magic-[1~5].png:[75*4,50]\n        [/frame]\n        {SOUND:HIT_AND_MISS magic-dark-big.ogg magic-dark-big-miss.ogg -150}\n        [frame]\n            image=\"units/undead-necromancers/lich-magic-[2,1].png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=shadow wave\n        [/filter_attack]\n\n        {MISSILE_FRAME_SHADOW_WAVE}\n\n        start_time=-675\n        [frame]\n            image=\"units/undead-necromancers/lich-magic-[1,2].png:75\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/lich-magic-3.png\"\n            halo=halo/undead/black-magic-[1~5].png:[75*4,50]\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/lich-magic-3.png:200\"\n        [/frame]\n        {SOUND:HIT_AND_MISS magic-dark-big.ogg magic-dark-big-miss.ogg -50}\n        [frame]\n            image=\"units/undead-necromancers/lich-magic-[2,1].png:50\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/lich.png:50\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=touch\n        [/filter_attack]\n        start_time=-250\n        [frame]\n            image=\"units/undead-necromancers/lich.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/lich-melee-[1~2].png:[100,200]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS wail-sml.wav {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/undead-necromancers/lich-magic-1.png:75\"\n        [/frame]\n        [frame]\n            image=\"units/undead-necromancers/lich.png:75\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Skeleton": {
    "id": "Skeleton",
    "image": "units/undead-skeletal/skeleton/skeleton.png",
    "profile": "portraits/undead/skeleton.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=axe\n        [/filter_attack]\n        {ATTACK_ANIM_DIRECTIONAL_10_FRAME \"units/undead-skeletal/skeleton/skeleton\" \"melee\" axe.ogg {SOUND_LIST:MISS}}\n    [/attack_anim]"
    ]
  },
  "Skeleton Archer": {
    "id": "Skeleton Archer",
    "image": "units/undead-skeletal/archer/archer.png",
    "profile": "portraits/undead/archer.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-445\n        [frame]\n            image=\"units/undead-skeletal/archer/archer-bow.png:65\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/archer/archer-bow-attack-[1~4].png:[75*2,100,130]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}\n        [frame]\n            image=\"units/undead-skeletal/archer/archer-bow.png:65\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=fist\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/undead-skeletal/archer/archer.png:100\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/archer/archer-attack.png:200\"\n        [/frame]\n        {SOUND:HIT_AND_MISS fist.ogg {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/undead-skeletal/archer/archer.png:100\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/undead-skeletal/archer/archer-bob-[1~8].png:200\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Skeleton Rider": {
    "id": "Skeleton Rider",
    "image": "units/undead-skeletal/rider.png",
    "profile": "portraits/undead/skeletal_rider.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=axe\n        [/filter_attack]\n\n        start_time=-700\n        horse_sound_start_time=-250\n        offset=0.0~-0.05:550,-0.05~0.65:200,0.65:50,0.65~0.0:350\n\n        [frame]\n            image=\"units/undead-skeletal/rider-attack[1~6].png:[200,200,200,150,100,200]\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/rider.png:50\"\n        [/frame]\n\n        [horse_sound_frame]\n            sound=horse-canter.wav\n        [/horse_sound_frame]\n\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/undead-skeletal/rider-hi.png:900\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/rider.png:600\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/rider-[lo,lo2,lo].png:[400,600,300]\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/rider.png:600\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        {WOUNDED_UNIT ()}\n        [frame]\n            image=\"units/undead-skeletal/rider-bob[1~8,7~2].png:[600,400,250*4,350,500,200*4,300,450]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/undead-skeletal/rider-breeze[1~4,2,5].png:[200,300*3,200*2]\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/rider-breeze[1~4,2,5].png:[200,300*3,200*2]\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/rider-breeze[1~4,2,5]b.png:[200,300*3,200*2]\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/undead-skeletal/rider-moving.png:250\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Banebow": {
    "id": "Banebow",
    "image": "units/undead-skeletal/banebow.png",
    "profile": "portraits/undead/banebow.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/bone-n.png\"\n            image_diagonal=\"projectiles/bone-ne.png\"\n        [/missile_frame]\n        start_time=-445\n        [frame]\n            image=\"units/undead-skeletal/banebow-bow.png:65\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/banebow-bow-attack-[1~4].png:[75*2,100,130]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}\n        [frame]\n            image=\"units/undead-skeletal/banebow-bow.png:65\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-275\n\n        [frame]\n            image=\"units/undead-skeletal/banebow-melee-defend-1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/banebow-melee-attack-[1~4].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -125}\n        [frame]\n            image=\"units/undead-skeletal/banebow-melee-defend-1.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Bone Knight": {
    "id": "Bone Knight",
    "image": "units/undead-skeletal/boneknight.png",
    "profile": "portraits/undead/skeletal_rider.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=axe\n        [/filter_attack]\n\n        start_time=-350\n        offset=-0.0~-0.05:200,-0.05~0.65:150,0.65~0.0:300\n        horse_sound_start_time=-200\n\n        [frame]\n            image=\"units/undead-skeletal/boneknight-[attack,attack2].png:[300,200]\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/boneknight.png:150\"\n        [/frame]\n\n        [horse_sound_frame]\n            sound=horse-canter.wav\n        [/horse_sound_frame]\n\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=trample\n        [/filter_attack]\n\n        start_time=-400\n        offset=\"0.0~-0.05:250,-0.05~0.80:150,0.80:130,0.80~0.0:370\"\n        horse_sound_start_time=-300\n\n        [frame]\n            image=\"units/undead-skeletal/boneknight-trample[1~4].png:[150*3,350]\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/boneknight.png:100\"\n        [/frame]\n\n        [horse_sound_frame]\n            sound=horse-canter.wav\n        [/horse_sound_frame]\n\n        {SOUND:HIT_AND_MISS club.ogg {SOUND_LIST:MISS} -75}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        {WOUNDED_UNIT ()}\n        [frame]\n            image=\"units/undead-skeletal/boneknight.png:650\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/boneknight-bob[1~5].png:[250*2,300,160,200]\"\n        [/frame]\n    [/standing_anim]",
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/undead-skeletal/boneknight.png:650\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/boneknight-s[1,2,1].png:[650*3]\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        [frame]\n            image=\"units/undead-skeletal/boneknight-moving.png:250\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Bone Shooter": {
    "id": "Bone Shooter",
    "image": "units/undead-skeletal/bone-shooter.png",
    "profile": "portraits/undead/bone-shooter.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=bow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/bone-n.png\"\n            image_diagonal=\"projectiles/bone-ne.png\"\n        [/missile_frame]\n        start_time=-445\n        [frame]\n            image=\"units/undead-skeletal/bone-shooter-bow.png:65\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/bone-shooter-bow-attack-[1~4].png:[75*2,100,130]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS bow.ogg bow-miss.ogg -380}\n        [frame]\n            image=\"units/undead-skeletal/bone-shooter-bow.png:65\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=dagger\n        [/filter_attack]\n        start_time=-275\n        [frame]\n            image=\"units/undead-skeletal/bone-shooter-melee-defend-1.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/bone-shooter-melee-attack-[1~4].png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS dagger-swish.wav {SOUND_LIST:MISS} -125}\n        [frame]\n            image=\"units/undead-skeletal/bone-shooter-melee-defend-1.png:50\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/undead-skeletal/bone-shooter-bob-[1~8].png:[150*3,200,150*4]\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Chocobone": {
    "id": "Chocobone",
    "image": "units/undead-skeletal/chocobone.png",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=spear\n        [/filter_attack]\n        start_time=-350\n        [frame]\n            image=\"units/undead-skeletal/chocobone-attack-[1~2].png:100\"\n        [/frame]\n        [if]\n            hits=no\n            [frame]\n                image=\"units/undead-skeletal/chocobone-attack-3.png:100\"\n                sound=spear-miss.ogg\n            [/frame]\n        [/if]\n        [else]\n            hits=yes\n            [frame]\n                image=\"units/undead-skeletal/chocobone-attack-3.png:50\"\n                sound=spear.ogg\n            [/frame]\n        [/else]\n        [frame]\n            image=\"units/undead-skeletal/chocobone-attack-[4,2,1].png:100\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Deathblade": {
    "id": "Deathblade",
    "image": "units/undead-skeletal/deathblade.png",
    "profile": "portraits/undead/deathblade.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=axe\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/undead-skeletal/deathblade-attack[1~3].png:[100,150,100]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n        [frame]\n            image=\"units/undead-skeletal/deathblade-defend-1.png:50\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Death Knight": {
    "id": "Death Knight",
    "image": "units/undead-skeletal/deathknight.png",
    "profile": "portraits/undead/death-knight.webp~CROP(0,0,400,400)",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crossbow\n        [/filter_attack]\n        missile_start_time=-150\n        [missile_frame]\n            duration=150\n            image=\"projectiles/missile-n.png\"\n            image_diagonal=\"projectiles/missile-ne.png\"\n        [/missile_frame]\n        start_time=-400\n        [frame]\n            image=\"units/undead-skeletal/deathknight-crossbow.png:100\"\n        [/frame]\n        {SOUND:HIT_AND_MISS crossbow.ogg crossbow-miss.ogg -300}\n        [frame]\n            image=\"units/undead-skeletal/deathknight-crossbow-attack[1~2].png:150\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=battle axe\n        [/filter_attack]\n        start_time=-300\n        [frame]\n            image=\"units/undead-skeletal/deathknight.png:50\"\n            offset=0.0~0.1\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/deathknight-melee-attack-[1~6].png:[50,100,75,100,50,75]\"\n            offset=0.1~0.15:50,0.15~0.35:100,0.35~0.45:75,0.45~0.5:100,0.5:20,0.5~0.4:30,0.4~0.2:75\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n        [frame]\n            image=\"units/undead-skeletal/deathknight.png:75\"\n            offset=0.2~0.0\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Death Squire": {
    "id": "Death Squire",
    "image": "units/undead-skeletal/deathsquire.png",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=axe\n        [/filter_attack]\n\n        start_time=-650\n        offset=0.0~-0.05:450,-0.05~0.65:200,0.65~0.0:350\n\n        [frame]\n            image=\"units/undead-skeletal/deathsquire-attack-[1~6].png:[150*4,200,175]\"\n        [/frame]\n        # this helps clean up out-of-hex artifacts, something that could be revisited\n        [frame]\n            image=\"units/undead-skeletal/deathsquire.png:25\"\n        [/frame]\n\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -75}\n    [/attack_anim]"
    ]
  },
  "Draug": {
    "id": "Draug",
    "image": "units/undead-skeletal/draug.png",
    "profile": "portraits/undead/draug.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=axe\n        [/filter_attack]\n        start_time=-200\n        [frame]\n            image=\"units/undead-skeletal/draug.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/undead-skeletal/draug-attack[1~2].png:[100,150]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n        [frame]\n            image=\"units/undead-skeletal/draug-defend-1.png:100\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/undead-skeletal/draug-bob[1~8].png:200\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Revenant": {
    "id": "Revenant",
    "image": "units/undead-skeletal/revenant/revenant.png",
    "profile": "portraits/undead/revenant.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=axe\n        [/filter_attack]\n        offset=0.0~0.35,0.35~0.55,0.55~0.35,0.35~0.0\n        start_time=-300\n        [frame]\n            image=\"units/undead-skeletal/revenant/revenant-attack-[1~10].png:[50*5,75*4,50]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS axe.ogg {SOUND_LIST:MISS} -50}\n    [/attack_anim]"
    ]
  },
  "Ghost": {
    "id": "Ghost",
    "image": "units/undead-spirit/ghost-base.png",
    "profile": "portraits/undead/ghost.webp",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=wail\n        [/filter_attack]\n        {MISSILE_FRAME_WAIL}\n        start_time=-200\n\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/undead-spirit/ghost-s-2.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/undead-spirit/ghost-s-attack-[1,2,1].png:[75,150,75]\"\n            [/frame]\n            [frame]\n                image=\"units/undead-spirit/ghost-s-2.png:25\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/undead-spirit/ghost-n-2.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/undead-spirit/ghost-n-attack-[1,2,1].png:[75,150,75]\"\n            [/frame]\n        [/else]\n        attack_sound_start_time=-100\n        [attack_sound_frame]\n            sound=wail-sml.wav\n        [/attack_sound_frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=touch\n        [/filter_attack]\n        start_time=-500\n        offset=0.0~1.0:425,0.0:225\n        alpha=0.8~0.0:425,0.0~0.8:225\n\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/undead-spirit/ghost-s-2.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/undead-spirit/ghost-s-attack-[1~3,2,1].png:[175*2,100,75*2]\"\n            [/frame]\n            [frame]\n                image=\"units/undead-spirit/ghost-s-2.png:25\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/undead-spirit/ghost-n-2.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/undead-spirit/ghost-n-attack-[1~3,2,1].png:[175*2,100,75*2]\"\n            [/frame]\n            [frame]\n                image=\"units/undead-spirit/ghost-n-2.png:25\"\n            [/frame]\n        [/else]\n\n        attack_sound_start_time=-126\n        [attack_sound_frame]\n            duration=1\n        [/attack_sound_frame]\n        [attack_sound_frame]\n            sound=wail-sml.wav\n        [/attack_sound_frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        direction=s,se,sw\n        start_time=0\n        alpha=0.8~0.4:1400,0.4~0.6:600,0.6~0.4:600,0.4~0.8:1400\n        shadow_start_time=0\n        shadow_alpha=0.5~0.0:1400,0.0~0.2:600,0.2~0.0:600,0.0~0.5:1400\n        [frame]\n            image=\"units/undead-spirit/ghost-s-[2,1~3,2,1~3,2,1~3,2,1~3].png:250\"\n        [/frame]\n        [shadow_frame]\n            image=\"units/undead-spirit/ghost-shadow.png:4000\"\n            auto_vflip=no\n            layer=2\n        [/shadow_frame]\n    [/standing_anim]",
      "[standing_anim]\n        direction=n,ne,nw\n        start_time=0\n        alpha=0.8~0.4:1400,0.4~0.6:600,0.6~0.4:600,0.4~0.8:1400\n        shadow_start_time=0\n        shadow_alpha=0.5~0.0:1400,0.0~0.2:600,0.2~0.0:600,0.0~0.5:1400\n        [frame]\n            image=\"units/undead-spirit/ghost-n-[2,1~3,2,1~3,2,1~3,2,1~3].png:250\"\n        [/frame]\n        [shadow_frame]\n            image=\"units/undead-spirit/ghost-n-shadow.png:4000\"\n            auto_vflip=no\n            layer=2\n        [/shadow_frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        direction=s,se,sw\n        start_time=0\n        alpha=0.8~0.4:1400,0.4~0.6:600,0.6~0.4:600,0.4~0.8:1400\n        [frame]\n            image=\"units/undead-spirit/ghost-s-[2,1~3,2,1~3,2,1~3,2,1~3].png:250\"\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        direction=n,ne,nw\n        start_time=0\n        alpha=0.8~0.4:1400,0.4~0.6:600,0.6~0.4:600,0.4~0.8:1400\n        [frame]\n            image=\"units/undead-spirit/ghost-n-[2,1~3,2,1~3,2,1~3,2,1~3].png:250\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Nightgaunt": {
    "id": "Nightgaunt",
    "image": "units/undead-spirit/nightgaunt.png",
    "profile": "portraits/undead/nightgaunt.webp",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n        offset=0.0:300,0.0~1.0:225,1.0~0.0:225\n        alpha=0.4~0.8:525,0.8~0.2:225\n        start_time=-525\n        [if]\n            value_second=1,3\n            [frame]\n                image=\"units/undead-spirit/nightgaunt-attack-[1,2,3a,4a].png:[200*3,125]\"\n            [/frame]\n        [/if]\n        [else]\n            value_second=2\n            [frame]\n                image=\"units/undead-spirit/nightgaunt-attack-[1,2,3b,4b].png:[200*3,125]\"\n            [/frame]\n        [/else]\n        {SOUND:HIT_AND_MISS claws.ogg {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/undead-spirit/nightgaunt.png:25\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        ghost_start_time=0\n        ghost_alpha=0.8~0.3:1000,0.3~0.5:600,0.5~0.3:600,0.3~0.8:1000\n        alpha=0.6~0.0:1000,0.0~0.2:600,0.2~0.0:600,0.0~0.6:1000\n        [ghost_frame]\n            image=\"units/undead-spirit/nightgaunt-standing-s-[3~1,2,3~1,2].png:[450,350,500,300,450,350,500,300]\"\n            auto_vflip=no\n        [/ghost_frame]\n        [frame]\n            image=\"units/undead-spirit/nightgaunt-shadow.png:800\"\n        [/frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        start_time=0\n        alpha=0.5~0.0:1400,0.0~0.2:600,0.2~0.1:600,0.1~0.5:1400\n        [frame]\n            image=\"units/undead-spirit/nightgaunt-standing-s-[1~3,2,1~3,2].png:[500*8]\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Shadow": {
    "id": "Shadow",
    "image": "units/undead-spirit/shadow-s-2.png",
    "profile": "portraits/undead/shadow.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=claws\n        [/filter_attack]\n        start_time=-500\n        offset=0.0~1.0:550,0.0:225\n        alpha=0.8~0.7:350,0.7~0.0:200,0.0~0.8:225\n\n        [if]\n            direction=s,se,sw\n            [frame]\n                image=\"units/undead-spirit/shadow-s-2.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/undead-spirit/shadow-s-attack-[1~6,2,1].png:[75*2,50*2,75,200,100*2]\"\n            [/frame]\n            [frame]\n                image=\"units/undead-spirit/shadow-s-2.png:25\"\n            [/frame]\n        [/if]\n        [else]\n            direction=n,ne,nw\n            [frame]\n                image=\"units/undead-spirit/shadow-n-2.png:25\"\n            [/frame]\n            [frame]\n                image=\"units/undead-spirit/shadow-n-attack-[1~6,2,1].png:[75*2,50*2,75,200,100*2]\"\n            [/frame]\n            [frame]\n                image=\"units/undead-spirit/shadow-n-2.png:25\"\n            [/frame]\n        [/else]\n        attack_sound_start_time=-325\n        [attack_sound_frame]\n            duration=225\n            sound=wail-sml.wav\n        [/attack_sound_frame]\n        [if]\n            hits=yes\n            [attack_sound_frame]\n                sound=claws.ogg\n            [/attack_sound_frame]\n        [/if]\n        [else]\n            hits=no\n            [attack_sound_frame]\n                sound={SOUND_LIST:MISS}\n            [/attack_sound_frame]\n        [/else]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        direction=s,se,sw\n        start_time=0\n        alpha=0.4~0.8:1400,0.8~0.6:600,0.6~0.8:600,0.8~0.4:1400\n        shadow_start_time=0\n        shadow_alpha=0.0~0.5:1400,0.5~0.2:600,0.2~0.5:600,0.5~0.0:1400\n        [frame]\n            image=\"units/undead-spirit/shadow-s-[2,1~3,2,1~3,2,1~3,2,1~3].png:250\"\n        [/frame]\n        [shadow_frame]\n            image=\"units/undead-spirit/ghost-shadow.png:4000\"\n            auto_vflip=no\n            layer=2\n        [/shadow_frame]\n    [/standing_anim]",
      "[standing_anim]\n        direction=n,ne,nw\n        start_time=0\n        alpha=0.4~0.8:1400,0.8~0.6:600,0.6~0.8:600,0.8~0.4:1400\n        shadow_start_time=0\n        shadow_alpha=0.0~0.5:1400,0.5~0.2:600,0.2~0.5:600,0.5~0.0:1400\n        [frame]\n            image=\"units/undead-spirit/shadow-n-[2,1~3,2,1~3,2,1~3,2,1~3].png:250\"\n        [/frame]\n        [shadow_frame]\n            image=\"units/undead-spirit/ghost-n-shadow.png:4000\"\n            auto_vflip=no\n            layer=2\n        [/shadow_frame]\n    [/standing_anim]"
    ],
    "movement_anim": [
      "[movement_anim]\n        direction=s,se,sw\n        start_time=0\n        alpha=0.4~0.8:1400,0.8~0.6:600,0.6~0.8:600,0.8~0.4:1400\n        [frame]\n            image=\"units/undead-spirit/shadow-s-[2,1~3,2,1~3,2,1~3,2,1~3].png:250\"\n        [/frame]\n    [/movement_anim]",
      "[movement_anim]\n        direction=n,ne,nw\n        start_time=0\n        alpha=0.4~0.8:1400,0.8~0.6:600,0.6~0.8:600,0.8~0.4:1400\n        [frame]\n            image=\"units/undead-spirit/shadow-n-[2,1~3,2,1~3,2,1~3,2,1~3].png:250\"\n        [/frame]\n    [/movement_anim]"
    ]
  },
  "Spectre": {
    "id": "Spectre",
    "image": "units/undead-spirit/spectre.png",
    "profile": "portraits/undead/spectre.webp~CROP(0,0,390,390)",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=wail\n        [/filter_attack]\n        {MISSILE_FRAME_WAIL}\n        start_time=-250\n        [frame]\n            image=\"units/undead-spirit/spectre.png:50\"\n        [/frame]\n        [frame]\n            sound=wail.wav\n            image=\"units/undead-spirit/spectre-se-attack-1.png:250\"\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=baneblade\n        [/filter_attack]\n        offset=0.0~0.1,0.1~0.0\n        start_time=-400\n        [frame]\n            image=\"units/undead-spirit/spectre-se-attack-[1~12].png:60\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        alpha=0.8~0.4:1100,0.4~0.6:450,0.6~0.4:450,0.4~0.8:1100\n        [frame]\n            image=\"units/undead-spirit/spectre-se-bob-[1~3,2,1~3,2,1~3,2,1~3,2].png:200\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Wraith": {
    "id": "Wraith",
    "image": "units/undead-spirit/wraith-s.png",
    "profile": "portraits/undead/wraith.webp",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=wail\n        [/filter_attack]\n        {MISSILE_FRAME_WAIL}\n        start_time=-250\n        [frame]\n            image=\"units/undead-spirit/wraith-s.png:50\"\n        [/frame]\n        [frame]\n            image=\"units/undead-spirit/wraith-s-defend-1.png:250\"\n            sound=wail-sml.wav\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=baneblade\n        [/filter_attack]\n        alpha=0.8~0.5:126,0.5~0.8:126\n        offset=0.0~0.3,0.3~0.45,0.45~0.3,0.3~0.0\n        start_time=-250\n        [frame]\n            image=\"units/undead-spirit/wraith-s-attack-[1~5].png:[150,100*2,90,80]\"\n        [/frame]\n        {SOUND:HIT_AND_MISS {SOUND_LIST:SWORD_SWISH} {SOUND_LIST:MISS} -100}\n        [frame]\n            image=\"units/undead-spirit/wraith-s-defend-1.png:50\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        alpha=0.8~0.4:1100,0.4~0.6:450,0.6~0.4:450,0.4~0.8:1100\n        [frame]\n            image=\"units/undead-spirit/wraith-s-[1~4,1~4,1~4,1~4].png:200\"\n        [/frame]\n    [/standing_anim]"
    ]
  },
  "Ancient Wose": {
    "id": "Ancient Wose",
    "image": "units/woses/wose-ancient.png",
    "profile": "portraits/woses/ancient-wose.png",
    "level": "3",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crush\n        [/filter_attack]\n        start_time=-500\n        {SOUND:HIT_AND_MISS wose-attack.ogg wose-miss.ogg -500}\n        [frame]\n            image=\"units/woses/wose-ancient-attack-[1,2,1].png:[400,200,100]\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Elder Wose": {
    "id": "Elder Wose",
    "image": "units/woses/wose-elder.png",
    "profile": "portraits/woses/wose.webp~CROP(0,35,435,435)",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crush\n        [/filter_attack]\n        start_time=-500\n        {SOUND:HIT_AND_MISS wose-attack.ogg wose-miss.ogg -500}\n        [frame]\n            image=\"units/woses/wose-elder-attack-[1,2,1].png:[400,200,100]\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Wose": {
    "id": "Wose",
    "image": "units/woses/wose.png",
    "profile": "portraits/woses/wose.webp~CROP(0,35,435,435)",
    "level": "1",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crush\n        [/filter_attack]\n        start_time=-500\n        {SOUND:HIT_AND_MISS wose-attack.ogg wose-miss.ogg -500}\n        [frame]\n            image=\"units/woses/wose-attack-[1,2,1].png:[400,150,75]\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Wose Sapling": {
    "id": "Wose Sapling",
    "image": "units/woses/wose-sapling.png",
    "profile": "portraits/woses/wose.webp~CROP(0,35,435,435)",
    "level": "0",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crush\n        [/filter_attack]\n        start_time=-500\n        {SOUND:HIT_AND_MISS wose-attack.ogg wose-miss.ogg -500}\n        [frame]\n            image=\"units/woses/wose-sapling.png:400\"\n        [/frame]\n        [frame]\n            image=\"units/woses/wose-sapling-attack.png:150\"\n        [/frame]\n        [frame]\n            image=\"units/woses/wose-sapling.png:75\"\n        [/frame]\n    [/attack_anim]"
    ]
  },
  "Wose Shaman": {
    "id": "Wose Shaman",
    "image": "units/woses/wose-shaman.png",
    "level": "2",
    "attack_anim": [
      "[attack_anim]\n        [filter_attack]\n            name=crush\n        [/filter_attack]\n        start_time=-500\n        {SOUND:HIT_AND_MISS wose-attack.ogg wose-miss.ogg -500}\n        [frame]\n            image=units/woses/wose-shaman-attack-[1~4].png:150\n        [/frame]\n    [/attack_anim]",
      "[attack_anim]\n        [filter_attack]\n            name=entangle\n        [/filter_attack]\n        missile_start_time=-250\n        [missile_frame]\n            offset=1.0\n            duration=250\n            image=projectiles/entangle.png\n            image_diagonal=projectiles/entangle.png\n        [/missile_frame]\n\n        start_time=-300\n        attack_sound_start_time=-100\n\n        [attack_sound_frame]\n            sound=entangle.wav\n        [/attack_sound_frame]\n\n        [frame]\n            image=units/woses/wose-shaman-attack-ranged-[1,2,1].png:[400,225,75]\n            halo=\"halo/elven/nature-halo[1~8].png:75\"\n        [/frame]\n    [/attack_anim]"
    ],
    "standing_anim": [
      "[standing_anim]\n        start_time=0\n        [frame]\n            image=\"units/woses/wose-shaman.png\"\n            halo=\"halo/woses/shaman-stationary-halo[1~8].png:150\"\n        [/frame]\n    [/standing_anim]"
    ]
  }
}