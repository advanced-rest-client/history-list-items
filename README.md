
A `<history-list-items>` element renders a list of fistory items.

It should be used in a ARC requests history list view.

## Example
```
<history-list id="history" items="[[list]]"></history-list>
```
The `list` attribute is a list of requests to display.
The `list` will not change from the inside of the element and every state
change is informed via events.

It is safe to load a lot of results into the list. This element uses
the `iron-list` element that renders only a potion of items  to fit
available space.

## Adding pagination
Simplest solution is just to override the `items` array with new values.
It will cause list reset though and it will jump to fisrt element.
To avoid it you can use element's `addItems` function.
However the element will not notify back change in the list so other elements
or app will not notice element's array change.

To avoid this update the array of items as follows:
```
const newItems = new Array(100);
newItems.forEach((i) => this.push('existingItems', i));
```
It will push new elements - one by one - to the end of the array and notify
paths each time the new element will be added.

### Styling
`<history-list-items>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
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

You can style checkbox with paper-checkbox styles like:
```
:host {
  --paper-checkbox-checked-color: #1E88E5;
}
```



### Events
| Name | Description | Params |
| --- | --- | --- |
| history-list-item-delete | Fired when the user clicked on a delete button on an item. | item **Object** - An object associated with this item. |
index **Number** - Object's index in the list. |
| history-list-item-open | Fired when the user clicked on an open button on an item. | item **Object** - An object associated with this item. |
index **Number** - Object's index in the list. |
| history-list-threshold | Fired when the user nearly scrolled to the ened of the list. It usually means that the app should load more results. | __none__ |
