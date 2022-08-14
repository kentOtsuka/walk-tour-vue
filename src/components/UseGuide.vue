<template>
  <div>
    <h2 class="d-flex align-center justify-center">
      <v-icon left bottom color="green">mdi-book-open</v-icon>
      {{ $t('defaults.guide') }}
    </h2>
    <v-divider class="mb-1 mx-auto" style="max-width: 1200px; width: 90%" />
    <v-row class="mx-auto mb-2" style="max-width: 1200px">
      <v-col cols="12" sm="12" md="4" lg="4">
        <v-sheet class="align-center pa-3" max-width="400px" style="margin: auto">
          <div style="text-align: center">
            <h3>{{ $t('guide.first_title') }}</h3>
            <v-icon class="my-2" color="blue darken-1" style="font-size: 80px">mdi-airplane</v-icon>
          </div>
          <p class="mb-0">{{ $t('guide.first_content') }}</p>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="12" md="4" lg="4">
        <v-sheet class="align-center pa-3" max-width="400px" style="margin: auto">
          <div style="text-align: center">
            <h3>{{ $t('guide.second_title') }}</h3>
            <v-icon class="my-2" color="pink" style="font-size: 80px">mdi-heart</v-icon>
          </div>
          <p class="mb-0">
            {{ $t('guide.second_content') }}
          </p>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="12" md="4" lg="4">
        <v-sheet
          disabled
          class="align-center pa-3"
          max-width="400px"
          style="margin: auto"
        >
          <div style="text-align: center; color: gray">
            <h3>{{ $t('guide.third_title') }}</h3>
            <v-icon class="my-2" color="gray" style="font-size: 80px">
              mdi-close-octagon-outline
            </v-icon>
            <p class="mb-0">{{ $t('guide.third_content') }}</p>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
