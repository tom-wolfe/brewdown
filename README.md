[![NPM version](https://badge.fury.io/js/brewdown.svg)](http://badge.fury.io/js/brewdown) [![Build Status](https://travis-ci.org/trwolfe13/brewdown.svg?branch=master)](https://travis-ci.org/trwolfe13/brewdown) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# brewdown

A flavour of markdown and stylesheet specifically for D&amp;D 5th edition homebrew, implemented as a plugin for [markdown-it](https://github.com/markdown-it/markdown-it).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

```
npm install brewdown --save
```

### Usage

```javascript
const Markdown = require('markdown-it')
const brewdown = require('brewdown')

const md = new Markdown().use(brewdown)
const html = md.render('# This is a Heading')

console.log(html)
```

## Syntax

Where possible, the existing syntax rules have been leveraged to produce homebrew content, but out of necessity, there are some additional syntax extensions, the like of which are detailed below.

### Pages and Columns

By default, markdown is rendered to be best displayed on a single column webpage. For printing, and sometimes for aesthetics, however, it is preferable to display the content in two columns, as per the printed manuals. To achieve this, set the `style` option on the brewdown plugin to `two-col`. In the same way, you can also set the page size using the `pageSize` option. The default is A4. Valid page sizes include: `a2`, `a3`, `a4`, `a5`, `a6`, `b3`, `b4`, `b5`, `letter` and `legal`.

```javascript
const Markdown = require('markdown-it')
const brewdown = require('brewdown')

const md = new Markdown().use(brewdown, {style: "two-col", pageSize: "letter"})
const html = md.render('# This is a Heading')

console.log(html)
```

#### New Column

It is possible to force a new column using the `\newcolumn` command. This is often necessary as CSS columns aren't always accurate.

#### New Page

Unfortunately, there is no way to configure page automatically, so to begin a new page, you must use the `\newpage` command.

```md
# First Page
[My amazing homebrew]

\newpage

# Second Page
[More amazing homebrew]
``` 

### Headings

Heading styles range from levels 1 to 6, (`#` to `######`) and closely approximate those in the D&D 5th Edition Player Handbook.

### Lists

List styles are the same as regular markdown, with the exception that `*` will produce a bullet point, whilst `-` will not. This is of particular use listing features/attacks in stat blocks.

### Readaloud/Descriptive Text

As per the published adventures, you can produce descriptive or 'read aloud' text that is scripted. This can be done in two ways, either using the standard quoting syntax, or using the new triple quote (""") container with a description type.

#### Markdown

```md
"""description
# Description
You enter, through a low arch of cold stone, into the vast cavern beyond...
"""

> # Description
> You enter, through a low arch of cold stone, into the vast cavern beyond...
```

#### HTML

```html
<blockquote>
  <h1>Description</h1>
  <p>You enter, through a low arch of cold stone, into the vast cavern beyond...</p>
</blockquote>
```

#### Image
![Description Preview](/docs/images/description.png)

### Notes

As per the published adventures, you can produce descriptive or 'read aloud' text that is scripted. This can be done in two ways, either using the standard quoting syntax, or using the new triple quote (""") container with a description type.

#### Markdown
```md
"""note
# Markdown!
This text will appear inside a green box with fancy corners
"""
```

#### Image
![Note Preview](/docs/images/note.png)

### Ability Blocks

These are fairly straightforward, but require some new syntax that is hopefully intuitive. See the example below for an idea on how to output ability blocks.

#### Markdown
```md
{abilities: STR=7, DEX=15, CON=9, INT=8, WIS=7, CHA=8}
```

#### HTML

```html
<table class="abilities">
  <thead>
    <tr>
      <th>STR</th>
      <th>DEX</th>
      <th>CON</th>
      <th>WIS</th>
      <th>INT</th>
      <th>CHA</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>15 (+2)</td>
      <td>13 (+1)</td>
      <td>1 (-5)</td>
      <td>1 (-5)</td>
      <td>13 (+1)</td>
      <td>9 (-1)</td>
    </tr>
  </tbody>
</table>
```

#### Image

![Note Preview](/docs/images/abilityblock.png)

### Small Tables

Tables are unchanged from regular markdown, they just have styles applied.

### Class Tables

Class tables are simple, simply wrap your class details in a `:::` block titled `classtable`, as per the example below.

#### Markdown
```md
::: classtable
##### The Programmer
| Level | Proficiency Bonus | Features            |
|:-----:|:-----------------:|:--------------------|
|  1st  |         +2        | Hello World         |
|  2nd  |         +2        | Nocturnal Biorhythm |
|  3rd  |         +2        | Caffeine Resistance |
:::
```

#### HTML

```html
<div class="classtable">
  <h5>The Programmer</h5>
  <table>
    <thead>
      <tr>
        <th style="text-align:center">Level</th>
        <th style="text-align:center">Proficiency Bonus</th>
        <th style="text-align:left">Features</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align:center">1st</td>
        <td style="text-align:center">+2</td>
        <td style="text-align:left">Hello World</td>
      </tr>
      <tr>
        <td style="text-align:center">2nd</td>
        <td style="text-align:center">+2</td>
        <td style="text-align:left">Nocturnal Biorhythm</td>
      </tr>
      <tr>
        <td style="text-align:center">3rd</td>
        <td style="text-align:center">+2</td>
        <td style="text-align:left">Caffeine Resistance</td>
      </tr>
    </tbody>
  </table>
</div>
```

#### Image
![Description Preview](/docs/images/classtable.png)

### Stat Blocks

One of the more complex components that can be about As per the published adventures, you can produce descriptive or 'read aloud' text that is scripted. This can be done in two ways, either using the standard quoting syntax, or using the new triple quote (""") container with a description type.

#### Markdown

```md
:::stats
## Kobold
*Small Humanoid (kobold), lawful evil*
___
- **Armor Class** 12
- **Hit Points** 5 (2d6 - 2)
- **Speed** 30 ft.
___
{abilities: STR=7, DEX=15, CON=9, INT=8, WIS=7, CHA=8}
___
- **Senses** darkvision 60 ft., passivePerception 8
- **Languages** Common, Draconic
- **Challenge** 1/8 (25 XP)
___
- **Sunlight Sensitivity.** While in sunlight, the kobold has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
- **Pack Tactics.** The kobold has advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally isn't incapacitated.
___
### Actions
- ***Dagger.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage.
- ***Sling.*** *Ranged Weapon Attack:* +4 to hit, reach 30/120 ft., one target. *Hit:* 4 (1d4 + 2) bludgeoning damage
:::
```
#### HTML

```html
<div class="stats">
  <h2>Kobold</h2>
  <p><em>Small Humanoid (kobold), lawful evil</em></p>
  <hr>
  <ul class="no-bullet">
    <li><strong>Armor Class</strong> 12</li>
    <li><strong>Hit Points</strong> 5 (2d6 - 2)</li>
    <li><strong>Speed</strong> 30 ft.</li>
  </ul>
  <hr>
    <!-- Omitted ability block for brevity -->
  <hr>
  <ul class="no-bullet">
    <li><strong>Senses</strong> darkvision 60 ft., passivePerception 8</li>
    <li><strong>Languages</strong> Common, Draconic</li>
    <li><strong>Challenge</strong> 1/8 (25 XP)</li>
  </ul>
  <hr>
  <ul class="no-bullet">
    <li><strong>Sunlight Sensitivity.</strong> While in sunlight, the kobold has disadvantage on attack rolls, as well as on
      Wisdom (Perception) checks that rely on sight.</li>
    <li><strong>Pack Tactics.</strong> The kobold has advantage on an attack roll against a creature if at least one of the kobold's
      allies is within 5 feet of the creature and the ally isn't incapacitated.</li>
  </ul>
  <hr>
  <h3>Actions</h3>
  <ul class="no-bullet">
    <li><strong><em>Dagger.</em></strong> <em>Melee Weapon Attack:</em> +4 to hit, reach 5 ft., one target. <em>Hit:</em> 4 (1d4 + 2) piercing damage.</li>
    <li><strong><em>Sling.</em></strong> <em>Ranged Weapon Attack:</em> +4 to hit, reach 30/120 ft., one target. <em>Hit:</em> 4 (1d4 + 2) bludgeoning damage</li>
  </ul>
</div>
```

#### Image
![Description Preview](/docs/images/statblock.png)

## Installing Dependencies

Installing the dependencies is done using a standard ```npm install```.

## Running the Tests

Tests are written (and run) using [Jasmine](https://jasmine.github.io/). The following command will run the tests.

```
npm test
```

## Building the project

```
npm run build
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/trwolfe13/brewdown/tags). 

## Authors

* **Tom Wolfe** - *Initial work* - [trwolfe13](https://github.com/trwolfe13)

See also the list of [contributors](https://github.com/trwolfe13/brewdown/contributors) who participated in this project.

## Credits

A lot of this work would not have been possible were it not for the [Homebrewery project](https://github.com/stolksdorf/homebrewery) developed by [stolksdorf](https://github.com/stolksdorf). It is from that project the styling and graphics are based (and in some cases outright taken).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
