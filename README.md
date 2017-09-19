[![Build Status](https://travis-ci.org/advanced-rest-client/history-list-items.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/history-list-items)  

# history-list-items

A `<history-list-items>` element renders a list of fistory items.

## Data model

Each history item requires following properties:

-   `hasHeader` (Boolean) If true it renders section header for a history items (with the date). If set, `header` property is required
-   `header` (String) Required if `hasHeader` property is set. Label of the header (the date)
-   `method` (String) HTTP method of the request
-   `url` (String) The URL of the request
-   `updated` (Number) Timestamp of request update

## Example

```
<history-list id="history" items="[[list]]"></history-list>
```

## List handing

The element uses `<iron-list>` element that creates a virtual list containing
limited number of child elements. It allows to load huge number of requests
without influencing the performance.

## Adding pagination

Simplest solution is to override the `items` array with new values.
It causes list reset and the list jumps to the fisrt element. To avoid this behavior use element's `addItems` function.

### Styling
`<history-list-items>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--history-list-items-element` | Mixin to be applied to the element itself | `{}`
`--history-list-items` | Mixin applied to each list item | `{}`
`--history-list-items-url` | Mixin applied to the URL display element. Note that it is a inline element. | `{}`
`--history-list-items-method` | Mixin applied to the method display element. Note that it is a inline element. | `{}`
`--history-list-items-height` | Height of the list item. | `60px`
`--history-list-items-background-color` | Background color of the list. | `transparent`
`--history-list-items-selected-background-color` | Selection color for list items. | `#E0E0E0`
`--history-list-items-meta-row-color` | Font color of the bottom "meta" row (the one with time information.) | `#757575`
`--history-list-items-meta-row-font-size` | Font size of the bottom "meta" row (the one with time information.) | `12px`
`--history-list-items-open-background-color` | Background color of the "open" button. | `#1E88E5`
`--history-list-items-open-color` | Font color of the "open" button. | `white`



### Events
| Name | Description | Params |
| --- | --- | --- |
| history-list-item-delete | Fired when the user clicked on a delete button on an item. | item **Object** - An object associated with this item. |
index **Number** - Object's index in the list. |
| history-list-item-open | Fired when the user clicked on an open button on an item. | item **Object** - An object associated with this item. |
index **Number** - Object's index in the list. |
| history-list-item-selection-changed | Fired when the selection of an item changed. | item **Object** - An object associated with this item. |
index **Number** - Object's index in the list. |
selected **Boolean** - True if the item is currently selected. This mey not yet be reflected in other object states since this event is fired while selection is happening. |
| history-list-threshold | Fired when the user nearly scrolled to the ened of the list. It usually means that the app should load more results. | __none__ |
