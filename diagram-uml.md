# TraceHerbal - Diagram UML (BAB IV)

## 1. Use Case Diagram

```mermaid
graph TD
    subgraph System[" "]
        UC1["Login"]
        UC2["Register"]
        UC3["Input Bahan Baku"]
        UC4["Proses Produksi"]
        UC5["Smart Labeling / Generate QR"]
        UC6["Transaction Translator / Lihat Riwayat"]
        UC7["Verifikasi Produk dengan Smart Summary"]
        UC8["Kelola Data UMKM"]
        UC9["Monitor Transaksi Blockchain"]
        UC10["Gamification / Level Progress"]
        UC11["Logout"]
    end

    Produsen --> UC1
    Produsen --> UC2
    Produsen --> UC3
    Produsen --> UC4
    Produsen --> UC5
    Produsen --> UC6
    Produsen --> UC10
    Produsen --> UC11
    
    Konsumen --> UC7
    
    Admin --> UC1
    Admin --> UC8
    Admin --> UC9
    Admin --> UC11
```

---

## 2. Activity Diagram - Smart Labeling

```mermaid
flowchart TD
    Start(("Start")) --> A["Produsen Login"]
    A --> B["Buka Menu Smart Labeling"]
    B --> C["Pilih Batch Produk"]
    C --> D["Pilih File Format"]
    D --> D1{"Format?"}
    D1 -->|PNG| E1["Set untuk Digital/Web"]
    D1 -->|PDF| E2["Set untuk Cetak"]
    E1 --> F["Pilih Label Size"]
    E2 --> F
    F --> F1{"Ukuran?"}
    F1 -->|3x3 cm| G["Generate Label Kecil"]
    F1 -->|5x5 cm| G
    F1 -->|8x8 cm| G
    F1 -->|Custom| G
    G --> H["Preview Label dengan QR Code"]
    H --> I["Download PDF/PNG"]
    I --> J["Cetak Label untuk Kemasan"]
    J --> End(("End"))
```

---

## 3. Activity Diagram - Verifikasi dengan Smart Summary

```mermaid
flowchart TD
    Start(("Start")) --> A["Konsumen Buka Halaman Verifikasi"]
    A --> B{"Metode Input"}
    B -->|Scan| C["Scan QR Code dengan Kamera"]
    B -->|Manual| D["Input Kode Produk"]
    C --> E["Sistem Memanggil verifyProduct"]
    D --> E
    E --> F{"Produk Ditemukan?"}
    F -->|Ya| G["Tampilkan Status Terverifikasi"]
    F -->|Tidak| H["Tampilkan Status Tidak Valid"]
    G --> I["Tampilkan Smart Summary Box"]
    I --> I1["Teks: Produsen X memproses Y pada tanggal Z"]
    I1 --> J["Tampilkan Detail Produk"]
    J --> K["Tampilkan Timeline Rantai Pasok"]
    K --> L["Tampilkan Info Produsen"]
    L --> End(("End"))
    H --> End
```

---

## 4. Sequence Diagram - Smart Labeling

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': { 'actorLineColor': '#000000', 'signalColor': '#000000', 'textColor': '#000000'}}}%%
sequenceDiagram
    participant Produsen
    participant WebApp
    participant SmartContract
    participant LabelGenerator

    Produsen->>WebApp: Pilih batch produk
    Produsen->>WebApp: Pilih format (PNG/PDF)
    Produsen->>WebApp: Pilih ukuran label (3x3/5x5/8x8/Custom)
    WebApp->>SmartContract: getBatchData(batchId)
    SmartContract-->>WebApp: Return data batch
    WebApp->>LabelGenerator: generateLabel(data, format, size)
    LabelGenerator-->>WebApp: Return label preview
    WebApp-->>Produsen: Tampilkan preview label
    Produsen->>WebApp: Klik Download
    WebApp->>LabelGenerator: exportLabel(format, quantity)
    LabelGenerator-->>Produsen: Download file PDF/PNG
```

---

## 5. Sequence Diagram - Transaction Translator

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': { 'actorLineColor': '#000000', 'signalColor': '#000000', 'textColor': '#000000'}}}%%
sequenceDiagram
    participant Produsen
    participant WebApp
    participant TransactionTranslator
    participant Blockchain

    Produsen->>WebApp: Buka halaman Riwayat
    WebApp->>Blockchain: getTransactionHistory(produsenId)
    Blockchain-->>WebApp: Return raw transactions
    WebApp->>TransactionTranslator: translateTransactions(rawData)
    TransactionTranslator-->>TransactionTranslator: Parse function calls
    TransactionTranslator-->>TransactionTranslator: Generate human-readable text
    TransactionTranslator-->>WebApp: Return translated descriptions
    WebApp-->>Produsen: Tampilkan tabel dengan Deskripsi Aktivitas
    Note over Produsen: Contoh: "Batch #JM-015 diproduksi: 25kg Kunyit ditambahkan"
```

---

## 6. Sequence Diagram - Verifikasi dengan Smart Summary

```mermaid
%%{init: {'theme': 'neutral', 'themeVariables': { 'actorLineColor': '#000000', 'signalColor': '#000000', 'textColor': '#000000'}}}%%
sequenceDiagram
    participant Konsumen
    participant WebApp
    participant SmartContract
    participant SmartSummaryEngine

    Konsumen->>WebApp: Scan QR Code
    WebApp->>SmartContract: verifyProduct(batchId)
    SmartContract-->>WebApp: Return product data
    WebApp->>SmartSummaryEngine: generateSummary(productData)
    SmartSummaryEngine-->>SmartSummaryEngine: Extract producer name
    SmartSummaryEngine-->>SmartSummaryEngine: Extract materials used
    SmartSummaryEngine-->>SmartSummaryEngine: Extract production date
    SmartSummaryEngine-->>WebApp: Return summary text
    alt Produk Valid
        WebApp-->>Konsumen: Tampilkan Smart Summary Box
        Note over Konsumen: "Terverifikasi: Produsen Jamu Sehat memproses 25kg Kunyit pada 13 Jan 2026"
        WebApp-->>Konsumen: Tampilkan detail dan timeline
    else Produk Tidak Valid
        WebApp-->>Konsumen: Tampilkan pesan error
    end
```

---

## 7. Class Diagram

```mermaid
classDiagram
    class Produsen {
        -String id
        -String nama
        -String alamat
        -String walletAddress
        -String level
        -Int xpPoints
        +login()
        +register()
        +getProfile()
        +getLevelProgress()
    }

    class SmartContract {
        -String contractAddress
        -String networkId
        +addRawMaterial(jenis, jumlah, supplier)
        +createBatch(produk, bahanBaku, jumlah)
        +verifyProduct(batchId)
        +getBatchData(batchId)
        +getTransactionHistory(produsenId)
    }

    class SmartLabeling {
        -String batchId
        -String format
        -String labelSize
        +generateLabel(data, format, size)
        +previewLabel()
        +exportPNG(quantity)
        +exportPDF(quantity)
    }

    class TransactionTranslator {
        -Array rawTransactions
        +translateTransactions(rawData)
        +parseFunctionCall(txData)
        +generateHumanReadable(parsed)
    }

    class SmartSummary {
        -Object productData
        +generateSummary(data)
        +extractProducerName()
        +extractMaterials()
        +extractProductionDate()
        +formatMessage()
    }

    class Gamification {
        -String produsenId
        -String currentLevel
        -Int currentXP
        -Int targetXP
        +calculateProgress()
        +checkLevelUp()
        +awardXP(action)
        +getBadges()
    }

    class Batch {
        -String batchNumber
        -String produk
        -Date tanggalProduksi
        -Date kadaluarsa
        -Int jumlahUnit
        -String txHash
        +save()
        +getById()
        +generateQRCode()
    }

    Produsen "1" --> "1" Gamification : memiliki
    Produsen "1" --> "*" Batch : memproduksi
    Produsen "1" --> "1" SmartContract : menggunakan
    Batch "1" --> "1" SmartLabeling : generates
    SmartContract "1" --> "1" TransactionTranslator : uses
    SmartContract "1" --> "1" SmartSummary : uses
```

---

## 8. Relasi Tabel (ERD)

```mermaid
erDiagram
    PRODUSEN ||--o{ BAHAN_BAKU : menginput
    PRODUSEN ||--o{ BATCH : memproduksi
    PRODUSEN ||--|| GAMIFICATION : memiliki
    BATCH }o--o{ BAHAN_BAKU : menggunakan
    BATCH ||--|| QR_CODE : memiliki
    BATCH ||--o{ SMART_LABEL : generates

    PRODUSEN {
        varchar id PK
        varchar nama
        varchar alamat
        varchar wallet_address
        varchar level
        int xp_points
        timestamp created_at
    }

    GAMIFICATION {
        varchar id PK
        varchar produsen_id FK
        varchar current_level
        int current_xp
        int target_xp
        json badges
    }

    BATCH {
        varchar batch_number PK
        varchar produsen_id FK
        varchar produk
        date tanggal_produksi
        date kadaluarsa
        int jumlah_unit
        varchar tx_hash
    }

    SMART_LABEL {
        varchar id PK
        varchar batch_id FK
        varchar format
        varchar label_size
        text preview_data
        int quantity
        timestamp generated_at
    }

    QR_CODE {
        varchar id PK
        varchar batch_id FK
        varchar verify_url
        text image_data
    }

    BAHAN_BAKU {
        varchar id PK
        varchar produsen_id FK
        varchar jenis
        float jumlah
        varchar supplier
        varchar tx_hash
    }
```

---

## Catatan Sinkronisasi (Updated)

| Komponen | Nama |
|----------|------|
| Aktor 1 | Produsen |
| Aktor 2 | Konsumen |
| Aktor 3 | Admin |
| Fitur Baru 1 | Smart Labeling (PDF/PNG) |
| Fitur Baru 2 | Transaction Translator |
| Fitur Baru 3 | Smart Summary |
| Fitur Baru 4 | Gamification (Level/XP) |
| Fitur Baru 5 | Logout |
| Method Input | addRawMaterial() |
| Method Verifikasi | verifyProduct() |
| Method Label | generateLabel() |
| Method Translate | translateTransactions() |
| Method Summary | generateSummary() |
| Method Logout | logout() |
