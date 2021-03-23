<template>
  <div v-if="bug.creator">
    <div class="body-text">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-2 text-center">
                  <div>
                    <router-link :to="{name: 'BugPage', params: {id: bug.id}}" v-if="state.route.name != 'BugPage'">
                      <h5>{{ bug.title }}</h5>
                    </router-link>
                    <div v-else>
                      <h5>{{ bug.title }}</h5>
                    </div>
                    <div v-if="state.user.isAuthenticated">
                      <div v-if="state.user.email===bug.creator.email">
                        <div v-if="route.name != 'Home' ">
                          <div v-if="!bug.closed">
                            <button class="btn btn-info my-2" type="button" data-toggle="modal" data-target="#create-note">
                              Add a Note
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-2 text-center">
                  <h5>{{ bug.description }}</h5>
                </div>
                <div class="col-2 text-center"
                     v-if="bug.closed"
                >
                  <h5 class="text-success">
                    CLOSED
                  </h5>
                </div>
                <div v-else class="col-2 text-center">
                  <h5 class="text-danger">
                    OPEN
                  </h5>
                </div>
                <div class="col-2 text-right" v-if="bug">
                  <div class="row" v-if="bug.creator">
                    <div class="col-6">
                      <h5>{{ bug.creator.email }}</h5>
                    </div>
                    <div class="col-6">
                      <img :src="bug.creator.picture" alt="Bug Owner Pic">
                    </div>
                  </div>
                </div>
                <div class="col-2 text-right">
                  <div class="row">
                    <div class="col-12 text-center">
                      <div v-if="bug.createdAt">
                        <p>Posted: {{ bug.createdAt.slice(5,7) }}/{{ bug.createdAt.slice(8,10) }}/{{ bug.createdAt.slice(0,4) }}</p>
                      </div>
                    </div>
                    <div class="col-12 text-center">
                      <div v-if="bug.createdAt">
                        <p>At: {{ bug.createdAt.slice(11,19) }}</p>
                      </div>
                    </div>
                  </div>
                  <div v-if="state.user.email===bug.creator.email">
                    <div v-if="!bug.closed" class="col-12 text-center">
                      <button class="btn btn-info" @click="deleteBug">
                        Squash!
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  <div class="row">
                    <div class="col-12">
                      <div v-if="bug.createdAt">
                        <p>Updated: {{ bug.updatedAt }}</p>
                      </div>
                    </div>
                    <div class="col-12">
                      <div v-if="bug.createdAt">
                        <p>At: {{ bug.createdAt.slice(11,19) }}</p>
                      </div>
                    </div>
                    <div v-if="route.name != 'Home' ">
                      <div v-if="state.user.email === bug.creator.email">
                        <div v-if="!bug.closed" class="col-12">
                          <button class="btn btn-primary" data-toggle="modal" data-target="#edit-bug">
                            Edit Bug!
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
export default {
  name: 'Bug',
  props: {
    bug: {
      type: Object, required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      route: useRoute(),
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs),
      notes: computed(() => AppState.notes),
      user: computed(() => AppState.user)

    })
    return {
      state,
      route,

      async edit() {
        bugsService.edit(state.bug)
        state.edit = false
      },

      deleteBug() {
        return bugsService.deleteBug(props.bug.id)
      },
      getBugDate(id) {
        bugsService.getBugDate(id)
      }
    }
  }
}
</script>
<style scoped>

</style>
