# TraceHerbal - Use Case Diagram (PlantUML)

## Cara Export ke PNG:
1. Buka https://www.plantuml.com/plantuml/uml
2. Copy-paste kode di bawah
3. Klik Generate → Download PNG

---

## Kode PlantUML (Updated dengan Fitur Baru):

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle
skinparam actorStyle awesome
skinparam monochrome true

actor Produsen
actor Konsumen
actor Admin

rectangle "Sistem TraceHerbal" {
    package "Autentikasi" {
        usecase "Login" as UC1
        usecase "Register" as UC2
        usecase "Logout" as UC11
    }
    
    package "Manajemen Produksi" {
        usecase "Input Bahan Baku" as UC3
        usecase "Proses Produksi" as UC4
    }
    
    package "Smart Labeling" {
        usecase "Generate QR Code" as UC5
        usecase "Pilih Format (PNG/PDF)" as UC5a
        usecase "Pilih Ukuran Label" as UC5b
        usecase "Preview Label" as UC5c
        usecase "Download/Print Label" as UC5d
    }
    
    package "Transaction Translator" {
        usecase "Lihat Riwayat Transaksi" as UC6
        usecase "Tampilkan Deskripsi Human-Readable" as UC6a
    }
    
    package "Verifikasi Konsumen" {
        usecase "Scan QR Code" as UC7
        usecase "Verifikasi Produk" as UC7a
        usecase "Tampilkan Smart Summary" as UC7b
        usecase "Lihat Timeline Rantai Pasok" as UC7c
    }
    
    package "Administrasi" {
        usecase "Kelola Data UMKM" as UC8
        usecase "Monitor Transaksi" as UC9
    }
    
    package "Gamification" {
        usecase "Lihat Level Progress" as UC10
        usecase "Dapatkan XP Points" as UC10a
        usecase "Unlock Badges" as UC10b
    }
}

Produsen --> UC1
Produsen --> UC2
Produsen --> UC3
Produsen --> UC4
Produsen --> UC5
Produsen --> UC6
Produsen --> UC10
Produsen --> UC11

UC5 ..> UC5a : <<include>>
UC5 ..> UC5b : <<include>>
UC5 ..> UC5c : <<include>>
UC5a ..> UC5d : <<include>>

UC6 ..> UC6a : <<include>>

Konsumen --> UC7
UC7 ..> UC7a : <<include>>
UC7a ..> UC7b : <<include>>
UC7a ..> UC7c : <<include>>

UC10 ..> UC10a : <<include>>
UC10 ..> UC10b : <<include>>

Admin --> UC1
Admin --> UC8
Admin --> UC9
Admin --> UC11
@enduml
```

---

## Use Case Diagram Sederhana (Tanpa Package):

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle
skinparam monochrome true

actor Produsen
actor Konsumen
actor Admin

rectangle "Sistem TraceHerbal" {
    usecase "Login" as UC1
    usecase "Register" as UC2
    usecase "Logout" as UC11
    usecase "Input Bahan Baku" as UC3
    usecase "Proses Produksi" as UC4
    usecase "Smart Labeling (PDF/PNG)" as UC5
    usecase "Transaction Translator" as UC6
    usecase "Verifikasi dengan Smart Summary" as UC7
    usecase "Kelola Data UMKM" as UC8
    usecase "Monitor Transaksi" as UC9
    usecase "Gamification (Level/XP)" as UC10
}

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
@enduml
```

---

## Activity Diagram - Smart Labeling (PlantUML):

```plantuml
@startuml
skinparam monochrome true
start
:Produsen Login;
:Buka Menu Smart Labeling;
:Pilih Batch Produk;
:Pilih File Format;
if (Format?) then (PNG)
    :Set untuk Digital/Web;
else (PDF)
    :Set untuk Cetak;
endif
:Pilih Label Size;
switch (Ukuran?)
case (3x3 cm)
    :Generate Label Kecil;
case (5x5 cm)
    :Generate Label Sedang;
case (8x8 cm)
    :Generate Label Besar;
case (Custom)
    :Generate Label Custom;
endswitch
:Preview Label dengan QR Code;
:Download PDF/PNG;
:Cetak Label untuk Kemasan;
stop
@enduml
```

---

## Sequence Diagram - Smart Summary (PlantUML):

```plantuml
@startuml
skinparam monochrome true
actor Konsumen
participant WebApp
participant SmartContract
participant SmartSummaryEngine

Konsumen -> WebApp: Scan QR Code
WebApp -> SmartContract: verifyProduct(batchId)
SmartContract --> WebApp: Return product data
WebApp -> SmartSummaryEngine: generateSummary(data)
SmartSummaryEngine -> SmartSummaryEngine: Extract producer name
SmartSummaryEngine -> SmartSummaryEngine: Extract materials
SmartSummaryEngine -> SmartSummaryEngine: Extract date
SmartSummaryEngine --> WebApp: Return summary text

alt Produk Valid
    WebApp --> Konsumen: Tampilkan Smart Summary Box
    note right of Konsumen
        "Terverifikasi: Produsen 
        Jamu Sehat memproses 
        25kg Kunyit pada 13 Jan 2025"
    end note
    WebApp --> Konsumen: Tampilkan timeline
else Produk Tidak Valid
    WebApp --> Konsumen: Error message
end
@enduml
```

---

## Class Diagram (PlantUML):

```plantuml
@startuml
skinparam monochrome true

class Produsen {
    -id: String
    -nama: String
    -level: String
    -xpPoints: Int
    +login()
    +register()
    +logout()
    +getLevelProgress()
}

class SmartContract {
    -contractAddress: String
    +addRawMaterial()
    +createBatch()
    +verifyProduct()
    +getBatchData()
}

class SmartLabeling {
    -batchId: String
    -format: String
    -labelSize: String
    +generateLabel()
    +previewLabel()
    +exportPNG()
    +exportPDF()
}

class TransactionTranslator {
    +translateTransactions()
    +generateHumanReadable()
}

class SmartSummary {
    +generateSummary()
    +formatMessage()
}

class Gamification {
    -currentLevel: String
    -currentXP: Int
    +calculateProgress()
    +awardXP()
    +getBadges()
}

Produsen "1" --> "1" Gamification
Produsen "1" --> "*" SmartLabeling
Produsen "1" --> "1" SmartContract
SmartContract --> TransactionTranslator
SmartContract --> SmartSummary
@enduml
```

---

## Daftar Fitur Baru dalam Diagram

| Fitur | Deskripsi | Aktor |
|-------|-----------|-------|
| Smart Labeling | Export QR ke PNG/PDF dengan ukuran label | Produsen |
| Transaction Translator | Terjemahkan tx hash ke teks human-readable | Produsen |
| Smart Summary | Ringkasan verifikasi dalam bahasa sederhana | Konsumen |
| Gamification | Level progress (Gold/Platinum) dan XP | Produsen |
| Logout | Keluar dari sistem dan hapus session | Produsen, Admin |
