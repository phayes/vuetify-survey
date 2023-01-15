# vuetify-survey

This package allows you to declaratively configure surveys. It is similar to SurveyJS, but uses Vuetify to both render the survey and for the (optional) editor. 

It provides two components:

`<VuetifySurvey>`

`<VuetifySurveyEdit>`

# Example Application

To view sample application, simply run 'yarn install && yarn serve'

![image](https://user-images.githubusercontent.com/207037/212561126-ea85c65a-270b-4d14-999b-d53d07bccf66.png)

# Use-case

You can use `<VuetifySurveyEdit>` to let your users build up questionaires, then store the resulting declarative definition in a database.  The stored definitions can then be loaded and displayed to other users using `<VuetifySurvey>`. 
