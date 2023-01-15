# Vuetify Survey

This package allows you to declaratively configure surveys and questionnaires. It is similar to SurveyJS, but uses Vuetify to both render the survey and for the (optional) editor. 

It provides two components:

`<VuetifySurvey>`: Allows end-users to fill out surveys.

`<VuetifySurveyEditor>`: Allows other users to configure declarative survey definitions. 

## Use-case

You can use `<VuetifySurveyEditor>` to let your users build up questionaires, then store the resulting declarative definition in a database.  The stored definitions can then be loaded and displayed to other users using `<VuetifySurvey>`. 

## Example Application

To view sample application run `yarn install && yarn serve`

<img width="1094" alt="image" src="https://user-images.githubusercontent.com/207037/212561240-4e29e1d9-4945-49b9-b889-3a54d55f8671.png">

## API Reference

------------------

### Component: `<VuetifySurvey>`

`<VuetifySurvey>` is responsible for rendering a `SurveyDefinition`. 

#### props:
- `value`
     - type: `SurveyData` object
     - required: true
     - example: `<VuetifySurvey v-model="survey_data">`
- `survey`
     - type: `SurveyDefinition` object
     - required: true

#### slots:
 - `before-item`
     - binding: item of type `VuetifyItemDefinition`
     - example: `<VuetifySurvey><template v-slot:before-item="item">{{ item.title }}</template></VuetifySurvey>`
 - `after-item`
     - binding: item of type `VuetifyItemDefinition`
     - example: `<VuetifySurvey><template v-slot:after-item="item">{{ item.title }}</template></VuetifySurvey>`

------------------

### Component: `<VuetifySurveyEditor>`

`<VuetifySurveyEditor>` is responsible for providing a UI for editing a `SurveyDefinition`. 

#### props:
- `value`
     - type: `SurveyDefinition` object
     - required
     - example: `<VuetifySurveyEditor v-model="survey_definition">`
 - `show_item_id`
     - type: `Boolean`
     - default: `true`
     - description: `Set to false to disallow the user from seeing or editing the underlying identifier for each item` 
 - `allow_edit_item_class`
     - type: `Boolean`
     - default: `true`
     - description: `Set to false to disallow the user from editing the css class for each item` 
 - `allow_edit_item_class`
     - type: `Boolean`
     - default: `true`
     - description: `Set to false to disallow the user from editing the css style for each item` 
 - `allow_edit_item_visible`
     - type: `Boolean`
     - default: `true`
     - description: `Set to false to disallow the user from editing the visibility of the item`

------------

### Data Structure: `SurveyDefinition`

`SurveyDefinition` is an object that defines a survey.

#### properties:
- `title`
     - type: `String`
- `instructions`
     - type: `String`
- `items`
     - type: `Array` of `SurveyItemDefinition`

------------

### Data Structure: `SurveyItemDefinition`

`SurveyItemDefinition` is an object that defines a survey item, like a text-field or a checkbox.

#### core properties:
- `id`
     - type: `String`
     - required
     - description: `id` is used as the key for storing output values in `SurveyData`. Items that share the same `id` will share the same data in the survey. 
- `type`
     - type: `String` (enumerated)
     - required
     - allowed_values: `text-field`, `number-field`, `textarea`, `checkbox`, `switch`, `select`, `radio-group`, `checkboxes`, `date`, `birthday`, `rating`, `mood`
- `default_value`
     - type: `any`
     - description: Apply this default value to the item. When not set, a reasonable default is used.
- `props`
     - type: `Object`
     - description: key => value mapping of props that will be passed to the vuetify component. The key will be translated to kebab-case before being passed to the vuetify component.
 - `visible`
     - type: `String` | `Boolean`
     - description: To make this item conditionally visible, use a javascript expression that evaluates to true or false. For example, if you want to show this item only if the user's age is greater than 18, use: `age > 18`.  You can use any of the item's values in the expression.  For example, if you want to show this item only if the user's age is greater than the value of question_1, use: `question_1 && age > question_1`
 - `class`
     - type: `String`
     - description: Add this css class to the item
 - `style`
     - type: `String`
     - description: Add this css style to the item

#### additional properties:
 - `items`
     - type: `Array` of `SurveyOptionDefinition`
     - applies to: `select`, `radio-group`, `checkboxes`
 - `integer_only`
     - type: `Boolean`
     - applies to: `number-field`
 - `min`
     - type: `Number`
     - applies to: `number-field`
 - `max`
     - type: `Number`
     - applies to: `number-field`
 - `step`
     - type: `Number`
     - applies to: `number-field`
 - `maxlength`
     - type: `Number`
     - applies to: `text-field`, `textarea`
 - `rating_icon`
     - type: `String`
     - appies to: `rating`
     - allowed_values: `mdi-star`, `mdi-cards-heart`, `mdi-emoticon-happy`



------------

### Data Structure: `SurveyOptionDefinition`

For survey items that provide varios options to select (`select`, `radio-group`, `checkboxes`), `items` is set an array of `SurveyOptionDefinition` to define what options are available.

#### core properties:
- `value`
     - type: `String`
     - description: The underlying value that will be stored in the `SurveyData` object.
- `text`
     - type: `String`
     - description: The text displayed to the user for this option.
- `class`
     - type: `String`
     - description: Add this css class to the option element.
- `style`
     - type: `String`
     - description: Add this css style to the option element.
