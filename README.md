# Panda UI Javascript Library

This is the panda UI javascript library of services and helpers.

- [Libraries Used](#libraries-used)
- [Services](#services)
  - [DOM](#dom)
  - [HTML](#html)
    - [HTMLFrame](#htmlframe)
    - [Weblink](#weblink)
  - [Forms](#forms)
    - [Controls](#controls)
      - [FormElement](#formelement)
      - [FormInput](#forminput)
      - [FormButton](#formbutton)
      - [FormLabel](#formlabel)

## Libraries Used

Panda UI Javascript Library is based on **jQuery**.

## Services

Panda UI Js is a library of different services that are combined together into a single file.

Different services have different namespaces, based on the behavior and logic. The purpose of this library is to 
create a simplified interface for creating and handling HTML objects.

An example if such library is **FormElement**:

```javascript
Panda.Ui.Forms.FormElement.create('input', 'name', 'value', 'id', 'class');
```

This document will display the entire set of Services as they are distributed in different packages and namespaces.

### DOM

DOM is the basic Service which allows to create different html tags. Usage:

```javascript
Panda.Ui.DOM.create('p', 'This is a paragraph', 'id', 'class');
```

The above element is a jQuery object and we can use it accordingly:
```javascript
Panda.Ui.DOM.create('p', 'This is a paragraph', 'id', 'class')
    .appendTo('body');
```

### HTML

HTML is a service that extends DOM and provides the base for building more complex HTML Elements.

#### HTMLFrame

HTMLFrame is a simple service that creates `<iframe>` elements:

```javascript
var sandbox = true;
Panda.Ui.HTML.HTMLFrame.create('/src/for/frame', 'name', 'id', 'class', sandbox)
    .appendTo('body');
```

#### Weblink

Weblink is a simple service that creates `<a>` elements:

```javascript
Panda.Ui.HTML.Weblink.create('/path/to/href', '_blank', 'Weblink title', 'id', 'class')
    .appendTo('div.weblink-container');
```

### Forms

Forms is a base service for building form elements.

#### Controls

Controls (Forms) is a base service for building form controls and elements.

##### FormElement

FormElement is a service that creates form elements that have [name] and [value] attributes. Usage:

```javascript
Panda.Ui.Forms.Controls.FormElement.create('input', 'name', 'value', 'id', 'class')
    .appendTo('form');
```

##### FormInput

FormInput is a service that creates form inputs with all its necessary attributes:

```javascript
var required = false;
Panda.Ui.Forms.Controls.FormInput.create('text', 'name', 'value', 'id', required)
    .appendTo('form');
```

FormInput works automatically with checkbox and radio inputs. Set value to `true` or `false` to set to checked.

##### FormButton

FormButton is a service that creates button of any type:

```javascript
Panda.Ui.Forms.Controls.FormButton.create('A Button', 'button', 'id', 'string')
    .appendTo('form');
```

##### FormLabel

FormLabel is a service that creates labels:

```javascript
var required = false;
var inputId = 'test_input';
Panda.Ui.Forms.Controls.FormInput.create('text', 'name', 'value', inputId, required)
    .appendTo('form');

Panda.Ui.Forms.Controls.FormLabel.create('A Label', inputId)
    .prependTo('form');
```
