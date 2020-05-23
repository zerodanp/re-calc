<template>
  <q-layout view="hHh lpR fFf">
     <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          Real Estate Calculator
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab 
          v-for="link in essentialLinks"
          :key="link.title"
          :to="link.link" 
          :icon="link.icon" 
          :label="link.title" />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="768"
      :width="250"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label
          header
          class="text-grey-4"
        >
          Navigation
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          class="text-grey-4"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Home',
          icon: 'home',
          link: '/'
        },
        {
          title: 'Calculator',
          icon: 'computer',
          link: '/calculator'
        },
        {
          title: 'Settings',
          icon: 'settings',
          link: '/settings'
        }
      ],
    }
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 767px){
    .q-footer {
      display: none;
    }
  }

  .q-drawer {
    .q-router-link--exact-active{ 
    color:white !important;
    } 
  }
</style>
