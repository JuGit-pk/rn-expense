// react native dashboard styles

import { StyleSheet } from "react-native"

const dashBoard = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#DFF6FF",
    height: "100%",
    paddingBottom: 80,
    paddingTop: 80
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20
  },
  logo: {
    width: 30,
    height: 30
  },
  title: {
    fontSize: 37,
    fontWeight: "bold",
    paddingBottom: 10
  },
  deleteAll: {
    marginBottom: 20
  },
  btnText: {
    color: "white",
    fontSize: 14,
  },
  btnArea: {
    marginBottom: 20,
    marginTop:25
  },
  btnAreaCancel: {
    marginBottom: 20,
    backgroundColor: "#FFC300"
  },
  
  setColorBtn: {
    backgroundColor: "#FFC300",
    padding: 10,
    marginRight: 10
  },
})

export default dashBoard
