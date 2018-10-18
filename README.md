Visitor
=======

Visitor is a ClickDimensions specific, frontend only solution for rendering dynamic content on any page. Simply add the script to any page with ClickDimensions forms and Visitor will start using customer data and cookies on their own browser to personalize their experience on your site.

## Use

Using Visitor is as simple as adding the script to your site and then using the pre-defined xhtml tags to tell Visitor when/where to place/use it's collected data.

### Dynamic Content

Rendering dynamic content is as easy as inserting a `<cd>` tag into your normal HTML and then defining the target field/data using the `data-dynamo` attribute. Any default text should be included between the opening and closing `cd` tags.

```html
<h1>Hey <cd data-dynamo="...fieldname goes here...">...Default Text Goes Here...</cd> <cd data-dynamo="lastname"></cd>!</h1>
```
