import { StyleSheet } from "react-native"

const form = StyleSheet.create({
  formBody: {
    backgroundColor: "##FF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13
  },
  formContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },

  formInput: {
    width: "70%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  submitButton: {
    width: "30%",
    height: 40,
    backgroundColor: "#FF731D",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  view: {
    height: "87%",
    marginVertical: 30,
    marginHorizontal: 20,
    margin: 50
  },
  listitem: {
    backgroundColor: "#FFF7E9",
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  listLeft: {
    width: "78%",
    flexDirection: 'column'
  },
  noData: {
    textAlign: "center",
    marginTop: 20
  },
  deleteButton: {
    backgroundColor: "#FF731D",
    color: "#fff",
    borderRadius: 5,
    padding: 10
  },
  deleteAllDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  deleteAll: {
    backgroundColor: "#FF731D",
    color: "#fff",
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 5
  }
})

export default form
