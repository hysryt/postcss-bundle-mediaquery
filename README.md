# PostCSS Bundle MediaQuery
PostCSS plugin to bundle media queries that have same rules.

## Example
```css
/* Input example */
@media (max-width: 400px) {
  .box1 {
    width: 200px;
  }
}

@media (max-width: 400px) {
  .box2 {
    width: 200px;
  }
}
```
```css
/* Output example */
@media (max-width: 400px) {
  .box1 {
    width: 200px;
  }
  .box2 {
    width: 200px;
  }
}
```

## Add Comments
```js
/* postcss.config.js */
module.exports = () => ({
  plugins: {
    'postcss-test': {
      'comments': {
        '(max-width: 767px)': 'for smartphone',
        '(min-width: 768px)': 'for pc',
      }
    }
  }
})
```
```css
/* Input */
.box1 {
  background-color: red;
}

@media (max-width: 767px) {
  .box1 {
    width: 800px;
  }
}

@media (min-width: 768px) {
  .box1 {
    width: 200px;
  }
}
```
```css
/* Output */
.box1 {
  background-color: red;
}

/* 
 * for smartphone
 */

@media (max-width: 767px) {
  .box1 {
    width: 800px;
  }
}

/* 
 * for pc
 */

@media (min-width: 768px) {
  .box1 {
    width: 200px;
  }
}
```