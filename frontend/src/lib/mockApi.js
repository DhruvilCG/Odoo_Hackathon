import { v4 as uuid } from 'uuid'

const USERS_KEY = 'mkt_users'
const PRODUCTS_KEY = 'mkt_products'
const SESSION_KEY = 'mkt_session'
const PURCHASES_KEY = 'mkt_purchases'

function read(key){ return JSON.parse(localStorage.getItem(key)||'[]') }
function write(key,val){ localStorage.setItem(key,JSON.stringify(val)) }

export async function signup(email,password,username){
  const users = read(USERS_KEY)
  if(users.find(u=>u.email===email)) throw new Error('Email already used')
  const user = { id: uuid(), email, password, username }
  users.push(user)
  write(USERS_KEY,users)
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id:user.id }))
  return { id:user.id, email:user.email, username:user.username }
}
export async function login(email,password){
  const users = read(USERS_KEY)
  const u = users.find(x=>x.email===email && x.password===password)
  if(!u) throw new Error('Invalid credentials')
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id:u.id }))
  return { id:u.id, email:u.email, username:u.username }
}
export function logout(){ localStorage.removeItem(SESSION_KEY) }
export function getCurrentUser(){
  const s = JSON.parse(localStorage.getItem(SESSION_KEY)||'null')
  if(!s) return null
  const users = read(USERS_KEY)
  const u = users.find(x=>x.id===s.id)
  return u?{id:u.id,email:u.email,username:u.username}:null
}

// Product APIs
export async function createProduct(data){ const products = read(PRODUCTS_KEY); const p={...data,id:uuid(),createdAt:Date.now()}; products.push(p); write(PRODUCTS_KEY,products); return p }
export async function updateProduct(id,patch){ const products = read(PRODUCTS_KEY); const idx=products.findIndex(p=>p.id===id); if(idx===-1) throw new Error('Not found'); products[idx]={...products[idx],...patch}; write(PRODUCTS_KEY,products); return products[idx] }
export async function deleteProduct(id){ const products = read(PRODUCTS_KEY).filter(p=>p.id!==id); write(PRODUCTS_KEY,products) }
export async function listProducts(){ return read(PRODUCTS_KEY) }
export async function getProduct(id){ return read(PRODUCTS_KEY).find(p=>p.id===id) }
export async function listMyProducts(userId){ return read(PRODUCTS_KEY).filter(p=>p.ownerId===userId) }

// Cart & purchases
export function addToCart(product){ const cart = JSON.parse(localStorage.getItem('mkt_cart')||'[]'); cart.push(product); localStorage.setItem('mkt_cart',JSON.stringify(cart)) }
export function getCart(){ return JSON.parse(localStorage.getItem('mkt_cart')||'[]') }
export function clearCart(){ localStorage.removeItem('mkt_cart') }
export function addPurchase(userId,items){ const purchases = read(PURCHASES_KEY); purchases.push({id:uuid(),userId,items,date:Date.now()}); write(PURCHASES_KEY,purchases) }
export function listPurchases(userId){ return read(PURCHASES_KEY).filter(p=>p.userId===userId) }
