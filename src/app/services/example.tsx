"use client"

import React, { useState } from 'react';
import { logOut, signUp } from './firebaseAuth';
import { auth } from './firebase';

//Örnek giriş sayfası
const GirisSayfasi = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

return (
    <div>
      <h2>Örnek Giriş Sayfası</h2>
        <div>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)
            }
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={()=> signUp(email,password)}>Kayıt Ol</button>
        </div>

          <button onClick={()=> {
            logOut();
            window.location.reload();
          }}>Çıkış Yap</button>
          <div>
            Kullanıcının E mail değeri: {auth.currentUser?.email}
          </div>
        </div>
        
  );
};

export default GirisSayfasi;