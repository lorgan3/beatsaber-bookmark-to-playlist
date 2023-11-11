<script setup lang="ts">
import Form from "./components/form.vue";
</script>

<template>
  <header class="header">
    <a href="https://github.com/lorgan3/beatsaber-bookmark-to-playlist">
      <h1>Beat Saber bookmark to playlist converter</h1>
    </a>
  </header>

  <Form />
</template>

<style lang="scss">
@font-face {
  /* https://github.com/vercel/geist-font */
  font-family: Geist;
  src: url(./assets/GeistVariableVF.ttf);
}

#app {
  width: 100vw;
  height: 100vh;
  font-family: Geist;
  font-size: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 2em;
}

.header {
  background-color: #333;
  padding: 30px 10px;
  text-align: center;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

button {
  font-family: Geist;
  font-size: 24px;
  color: #000;

  &:disabled {
    color: rgba(16, 16, 16, 0.3);
  }
}

/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
ol,
ul {
  list-style: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* */
h3 {
  font-size: 18px;
  font-weight: bold;
}
</style>
