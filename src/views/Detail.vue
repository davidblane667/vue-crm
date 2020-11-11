<template>
  <div>
    <Loader v-if="loading"/>

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'Menu_History' | localize}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.textType}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            :class="{
              'red': record.type === 'outcome',
              'green': record.type === 'income'
            }"
            class="card"
          >
            <div class="card-content white-text">
              <p>{{'Record_Description' | localize}}: {{record.description}}</p>
              <p>{{'Sum' | localize}}: {{record.amount | currency('RUB')}}</p>
              <p>{{'Record_Category' | localize}}: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{'Message_RecordNotFoundStart' | localize}}<strong>{{$route.params.id}}</strong>{{'Message_RecordNotFoundEnd' | localize}}</p>
  </div>
</template>

<script>
  import localizeFilter from '../filters/localize.filter'

  export default {
    name: 'detail',
    data: () => ({
      record: null,
      loading: true
    }),
    async mounted() {
      const id = this.$route.params.id
      const record = await this.$store.dispatch('fetchRecordById', id)
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

      this.record = {
        ...record,
        textType: record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome'),
        categoryName: category.title
      }

      this.loading = false
    }
  }
</script>

<style lang="scss" scoped>

</style>
