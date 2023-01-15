# vuetify-survey

This package allows you to declaratively configure surveys. It is similar to SurveyJS, but uses Vuetify to both render the survey and for the (optional) editor. 

It provides two components:

`<VuetifySurvey>`

`<VuetifySurveyEdit>`

# Example Application

To view sample application run `yarn install && yarn serve`

<img width="1094" alt="image" src="https://user-images.githubusercontent.com/207037/212561240-4e29e1d9-4945-49b9-b889-3a54d55f8671.png">

# Use-case

You can use `<VuetifySurveyEdit>` to let your users build up questionaires, then store the resulting declarative definition in a database.  The stored definitions can then be loaded and displayed to other users using `<VuetifySurvey>`. 
