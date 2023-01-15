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
 - `after-item`

### Component: `<VuetifySurveyEditor>`

`<VuetifySurveyEditor>` is responsible for providing a UI for editing a `SurveyDefinition`. 

#### props:
- `value`
     - type: `SurveyDefinition` object
     - required: true
     - example: `<VuetifySurveyEditor v-model="survey_definition">`
 - `show_item_id`
     - type: `Boolean`
     - required: false
     - default: `true`
     - description: `Set to false to disallow the user from seeing or editing the underlying identifier for each item` 
 - `allow_edit_item_class`
     - type: `Boolean`
     - required: false
     - default: `true`
     - description: `Set to false to disallow the user from editing the css class for each item` 
 - `allow_edit_item_class`
     - type: `Boolean`
     - required: false
     - default: `true`
     - description: `Set to false to disallow the user from editing the css style for each item` 
 - `allow_edit_item_visible`
     - type: `Boolean`
     - required: false
     - default: `true`
     - description: `Set to false to disallow the user from editing the visibility of the item`
