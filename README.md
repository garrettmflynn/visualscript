# Proposal: visualscript
A framework for visual reactive programming on the browser

> **Note:** See the [Brains@Play Studio](https://app.brainsatplay.com/#studio) for an early iteration of this in raw JavaScript.

## Basic Usage
```html
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/brainsatplay-ui/"></script>
</head>
    <body></body>
    <script>
        const nav = new components.Nav({
            brand: {content: 'My Brand'},
            primary: {
                menu: [{content: 'Page 1'}, {content: 'Page 2'}],
                options: [{content: 'Log In'}]
            },
            secondary: [
                {content: 'Subdomain 1'},
                {content: 'Subdomain 2'},
                {content: 'Action', type:'button'}
            ],
        })
        document.body.insertAdjacentElement('afterbegin', nav)

    </script>
```

## Concepts
### Process
The entire `visualscript` framework is based on nested **Processes**.

### Editor
*Coming soon...*

### Controls
*Coming soon...*

### Events
*Coming soon...*


## To Do
1. Control Panel
    - Device Connection / Management + Playground
    - Multiplayer Session Management
    - File Viewer
2. Everything on https://web-components.carbondesignsystem.com/?path=/story/components-accordion--default


