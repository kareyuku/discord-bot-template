# Discord Bot Template
This template is using [discord.js](https://discord.js.org/#/docs/discord.js/v13/general/welcome)

## Command Structure

```js
{
    name: ""
    memberPermissions: []
    botPermissions: []
    filter: (client, m) => return { text: "" }
    run: (client, m, args) => {}
}
```
- name - Here you can define name of command
- memberPermissions - Its a array of required permissions for a member to run command
- botPermissions - Its a array of required permissions for a bot to run command
- filter - When its returning {text: ""} then command its not executing a run() and sending a message with text

## License
[MIT](https://choosealicense.com/licenses/mit/)
