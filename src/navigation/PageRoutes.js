import Detail from "../screens/Detail"
import ExpenseFrom from "../components/expense/ExpenseFrom"
import CategoryAdd from "../components/category/CategoryAdd"


export const route = [
  {
    name: "Details",
    component: Detail
  },
  {
    name: "ExpenseForm",
    component: ExpenseFrom
  },
  {
    name: "CategoryAdd",
    component: CategoryAdd
  }
]
