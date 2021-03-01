import React, { useContext, useState, useEffect } from "react"
import { auth } from "./firebase"
const AuthContext=React.useContext()


export  function AuthProvider({children}) {
    return (
       <AuthContext.Provider>
           {children}
       </AuthContext.Provider>
    )
}
