# vue-decorate
## what
A simple component wrapper to add attributes and other kind of things to it's child

### Use
-  download the package `npm i -s vue-decorate`

- Plugin:
    ```
    import Decorate from 'vue-decorate'
    Vue.use(Decorate.Plugin)

    …

    export const MyComponent {
      template: '
      <v-decorate class="bar" type="text">
        <input class="foo" type="password">
      </v-decorate>
      ',
    }
    ```

- Component:
    ```
    import Decorate from 'vue-decorate'

    export const MyComponent {
      components: { decorate: Decorate.component },
      template: '
      <decorate class="bar" type="text">
        <input class="foo" type="password">
      </decorate>
      ',
    }
    ```
