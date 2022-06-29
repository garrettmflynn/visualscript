# visualscript
A New Paradigm in Visual Reactive Programming

**visualscript** is the official low-code programming system for [brainsatplay](https://github.com/brainsatplay/brainsatplay) (our library for high-performance web applications), designed for real end-user applications.

Our vision is that **anyone can code**. Moreover, the results are reusable, performant *files* that can be exported anywhere by the user.

## Benefits
🔮 **Low Code:** Our browser-based editors (e.g. flow) makes it easy to wire together your application logic.

🧩 **Familiar:** We don't lock users into unnecessary abstractions. Just format code files as ES Modules!

⚡ **Performant:** The brainsatplay library guarantees high-performance event-based logic.

♿ **Inclusive:** Our fully accessible visual programming system uses the **Accessify** library to guarantee accessibility support for resulting applications through multimodal I/O support.

🖥️ **Local:** As a frontend-first framework, you can always develop your applications offline.

🖥️ **Backend Support:** Edit workspaces running in Node.js, local or the cloud.

🌐 **Social:** Derivative plugins can be published as NPM packages and registered on the awesome-brainsatplay library to be shared with the world.

📜 **Open Source:** This library is licensed under the AGPL license. All derivatives are also free and open-source software!

🪄 **Meta:** Customize the editor by writing extensions in itself!

## Getting Started with visualscript
### Select a Template
Say move.

### Choose your Options
Quick select screen for input and output modality.

### Explore Different Views
- File Tree
- Code
- Properties
- Relations List (IFTTT)
- Graph


## Authoring a Plugin
### What is a Plugin?
Ideally, **Plugins** express some intent or action (e.g. move) that can be related with a simple if statement. This allows us to recommend alternative ways to trigger the same reaction using a different I/O modality for peope with alternative communication needs.

### Create a Repo
Create a JS / TS repo with a package.json file
- must have “main” and “type: module”

### Define your Functionality
Separate independent functionality into separate files imported using E66 syntax into the “main” file
- wrap libraries (???)

## Creating a Theme
???

## Publish to the Community
### Create Metadata
Organize in a .brainsatplay folder
- Type: Browser / Node / Universal
- Capabilities: Input / Output / Both
- Modalities: Audio / Haptic / Graphic / Network / Ambient
- UI: URL or relative reference

### Preview the Project
Load into our online viewer to preview.

### Publish Source
On GitHub and/or NPM

### Let Us Know
Provide link to source package.json file as a pull request to awesome-brainsatplay.