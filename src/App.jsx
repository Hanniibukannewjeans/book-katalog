import { useState } from 'react'

// 1. DATA BUKU — ganti dengan buku kamu sendiri
const books = [
  { id: 1, title: 'Laut Bercerita', author: 'Leila S. Chudori', price: 45000, condition: 'Bagus' },
  { id: 2, title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', price: 38000, condition: 'Cukup' },
  { id: 3, title: 'Filosofi Teras', author: 'Henry Manampiring', price: 55000, condition: 'Seperti Baru' },
  { id: 4, title: 'Atomic Habits', author: 'James Clear', price: 60000, condition: 'Seperti Baru' },
  { id: 5, title: 'Sapiens', author: 'Yuval Noah Harari', price: 65000, condition: 'Bagus' },
  { id: 6, title: 'Pulang', author: 'Leila S. Chudori', price: 35000, condition: 'Cukup' },
]

// Ganti dengan nomor WhatsApp kamu (format internasional, tanpa "+" / "0" di depan)
const NOMOR_WA_PENJUAL = '628123456789'

export default function App() {
  // 2. STATE
  const [cart, setCart] = useState([])       // isi keranjang: [{ ...book, qty }]
  const [showForm, setShowForm] = useState(false) // lagi isi form checkout atau belum
  const [nama, setNama] = useState('')
  const [alamat, setAlamat] = useState('')
  const [telepon, setTelepon] = useState('')
  const [terkirim, setTerkirim] = useState(false)

  // 3. FUNGSI-FUNGSI KERANJANG
  function tambahKeKeranjang(book) {
    const sudahAda = cart.find((item) => item.id === book.id)
    if (sudahAda) {
      // kalau sudah ada, tambah qty-nya saja
      setCart(cart.map((item) =>
        item.id === book.id ? { ...item, qty: item.qty + 1 } : item
      ))
    } else {
      setCart([...cart, { ...book, qty: 1 }])
    }
  }

  function hapusDariKeranjang(id) {
    setCart(cart.filter((item) => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  // 4. SUBMIT FORM CHECKOUT -> buka WhatsApp dengan pesan otomatis
  function handleCheckout(e) {
    e.preventDefault()
    if (!nama || !alamat || !telepon) {
      alert('Nama, alamat, dan nomor telepon wajib diisi ya.')
      return
    }

    const daftarBuku = cart
      .map((item) => `- ${item.title} x${item.qty} (Rp${(item.price * item.qty).toLocaleString('id-ID')})`)
      .join('\n')

    const pesan = `Halo, saya mau pesan buku:\n${daftarBuku}\n\nTotal: Rp${total.toLocaleString('id-ID')}\n\nNama: ${nama}\nAlamat: ${alamat}\nTelepon: ${telepon}`

    window.open(`https://wa.me/${NOMOR_WA_PENJUAL}?text=${encodeURIComponent(pesan)}`, '_blank')

    setTerkirim(true)
    setCart([])
  }

  // 5. TAMPILAN
  return (
    <div className="container">
      <h1>📚 Katalog Buku Preloved</h1>
      <p>Buku bekas, kondisi jujur, harga bersahabat.</p>

      {/* Kalau pesanan sudah terkirim, tampilkan ucapan terima kasih */}
      {terkirim ? (
        <div className="card">
          <h2>Terima kasih, {nama}!</h2>
          <p>Pesanmu sudah disiapkan lewat WhatsApp. Kami akan segera menghubungi kamu.</p>
          <button onClick={() => setTerkirim(false)}>Belanja lagi</button>
        </div>
      ) : (
        <>
          {/* Daftar buku */}
          <div className="grid">
            {books.map((book) => (
              <div className="card" key={book.id}>
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <p className="condition">Kondisi: {book.condition}</p>
                <p className="price">Rp{book.price.toLocaleString('id-ID')}</p>
                <button onClick={() => tambahKeKeranjang(book)}>+ Keranjang</button>
              </div>
            ))}
          </div>

          {/* Keranjang */}
          <div className="cart">
            <h2>🛒 Keranjang ({cart.length})</h2>

            {cart.length === 0 ? (
              <p>Keranjang masih kosong.</p>
            ) : (
              <>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id}>
                      {item.title} x{item.qty} — Rp{(item.price * item.qty).toLocaleString('id-ID')}
                      <button className="remove" onClick={() => hapusDariKeranjang(item.id)}>hapus</button>
                    </li>
                  ))}
                </ul>
                <p className="total">Total: Rp{total.toLocaleString('id-ID')}</p>

                {!showForm && (
                  <button onClick={() => setShowForm(true)}>Checkout</button>
                )}
              </>
            )}

            {/* Form checkout, muncul setelah klik tombol Checkout */}
            {showForm && (
              <form onSubmit={handleCheckout} className="form">
                <h3>Data Pembeli & Pengiriman</h3>

                <label>
                  Nama Lengkap
                  <input value={nama} onChange={(e) => setNama(e.target.value)} />
                </label>

                <label>
                  Alamat Pengiriman
                  <textarea value={alamat} onChange={(e) => setAlamat(e.target.value)} rows={3} />
                </label>

                <label>
                  Nomor Telepon / WhatsApp
                  <input value={telepon} onChange={(e) => setTelepon(e.target.value)} />
                </label>

                <button type="submit">Kirim Pesanan via WhatsApp</button>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  )
}
