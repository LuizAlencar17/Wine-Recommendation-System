<template>
  <v-footer
    id="core-footer"
    absolute
    height="82"
  >
    <div class="footer-items">
      <span
        v-for="link in links"
        :key="link.name"
      >
        <a
          :href="link.Link"
          class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
    </div>
    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="https://www.creative-tim.com/"
        target="_blank">UEA</a>, Sua<span class="red--text">wine</span>&nbsp;
      <v-icon
        color="tertiary"
        size="17">mdi-desktop-mac</v-icon>
      Jean Machado, Luiz Fabio e Fabrizio Honda
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Principal', Link: '/#' },
      { name: 'Saiba mais', Link: '' },
      { name: 'Blog', Link: '' }
    ]
  })
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
