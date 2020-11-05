import { reactive } from 'vue'

function useAddStudent (state) {
  let state2 = reactive({
    stu: {
      id: '',
      name: '',
      age: '',
    },
  })

  function addStu (e) {
    e.preventDefault()
    const stu = Object.assign({}, state2.stu)
    state.stus.push(stu)
    state2.stu = {
      id: '',
      name: '',
      age: '',
    }
  }
  return { state2, addStu }
}

export default useAddStudent