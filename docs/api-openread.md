# OpenRead API Documentation

## Base URL
```
https://openread.ssnthailand.com/api
```

---

## API Endpoints Overview

| Endpoint | Method | Auth | Status |
|----------|--------|------|--------|
| `/api/dashboard` | GET | Public | ✅ Available |
| `/api/books` | GET | Public | ✅ Available |
| `/api/books/{id}` | GET | Public | ✅ Available |
| `/api/books/popular` | GET | Public | ✅ Available |
| `/api/books/recent` | GET | Public | ✅ Available |
| `/api/tags` | GET | Public | ✅ Available |
| `/api/tags/{id}` | GET | Public | ✅ Available |
| `/api/search` | GET | Public | ✅ Available |

> **Note:** POST/PUT/DELETE operations ใช้ Server Actions ผ่าน Frontend เท่านั้น ไม่เปิดเป็น REST API

---

## 1. Dashboard API

### GET /dashboard
ดึงข้อมูลสรุปสำหรับหน้าแรก

**Request:**
```
GET https://openread.ssnthailand.com/api/dashboard
```

**Response:**
```json
{
  "stats": {
    "total_books": 150,
    "total_views": 25000,
    "total_members": 500,
    "total_tags": 12
  },
  "popular_books": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "หนังสือยอดนิยม",
      "imageUrl": "/images/uuid.jpg",
      "pdfUrl": "/pdfs/uuid.pdf",
      "views": 1500,
      "rating": 5,
      "tagId": "tag-uuid",
      "tag": {
        "id": "tag-uuid",
        "title": "หมวดหมู่",
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    }
  ],
  "recent_books": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "title": "หนังสือล่าสุด",
      "imageUrl": "/images/uuid.jpg",
      "pdfUrl": "/pdfs/uuid.pdf",
      "views": 100,
      "rating": 4,
      "tagId": "tag-uuid",
      "tag": {
        "id": "tag-uuid",
        "title": "หมวดหมู่",
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z"
      },
      "createdAt": "2025-01-20T14:00:00.000Z",
      "updatedAt": "2025-01-20T14:00:00.000Z"
    }
  ],
  "tags_with_count": [
    {
      "id": "tag-uuid",
      "title": "นวนิยาย",
      "bookCount": 45
    }
  ]
}
```

---

## 2. Books API

### GET /books
ดึงรายการหนังสือทั้งหมด (รองรับ pagination และ search)

**Request:**
```
GET https://openread.ssnthailand.com/api/books?page=1&per_page=10&search=นวนิยาย&tag_id=xxx
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | หน้าที่ต้องการ |
| per_page | number | 10 | จำนวนต่อหน้า |
| search | string | "" | คำค้นหาในชื่อหนังสือ |
| tag_id | string | "" | กรองตามหมวดหมู่ |

**Response:**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "นวนิยายรักโรแมนติก",
      "imageUrl": "/images/550e8400-e29b-41d4-a716-446655440000.jpg",
      "pdfUrl": "/pdfs/550e8400-e29b-41d4-a716-446655440000.pdf",
      "views": 1250,
      "rating": 5,
      "tagId": "tag-uuid",
      "tag": {
        "id": "tag-uuid",
        "title": "นวนิยาย",
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-18T08:00:00.000Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 15,
    "per_page": 10,
    "total": 150
  }
}
```

---

### GET /books/{id}
ดึงรายละเอียดหนังสือตาม ID

**Request:**
```
GET https://openread.ssnthailand.com/api/books/550e8400-e29b-41d4-a716-446655440000
```

**Response (Success):**
```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "นวนิยายรักโรแมนติก",
    "imageUrl": "/images/550e8400-e29b-41d4-a716-446655440000.jpg",
    "pdfUrl": "/pdfs/550e8400-e29b-41d4-a716-446655440000.pdf",
    "views": 1250,
    "rating": 5,
    "tagId": "tag-uuid",
    "tag": {
      "id": "tag-uuid",
      "title": "นวนิยาย",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    },
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-18T08:00:00.000Z"
  }
}
```

**Response (Not Found):**
```json
{
  "success": false,
  "message": "ไม่พบหนังสือที่ต้องการ"
}
```

---

### GET /books/popular
ดึงหนังสือยอดนิยม (เรียงตามจำนวนวิว)

**Request:**
```
GET https://openread.ssnthailand.com/api/books/popular?limit=8
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | number | 8 | จำนวนหนังสือที่ต้องการ |

**Response:**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "หนังสือยอดนิยมอันดับ 1",
      "imageUrl": "/images/uuid.jpg",
      "pdfUrl": "/pdfs/uuid.pdf",
      "views": 5000,
      "rating": 5,
      "tagId": "tag-uuid",
      "tag": {
        "id": "tag-uuid",
        "title": "นวนิยาย",
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-18T08:00:00.000Z"
    }
  ]
}
```

---

### GET /books/recent
ดึงหนังสือล่าสุด (เรียงตามวันที่สร้าง)

**Request:**
```
GET https://openread.ssnthailand.com/api/books/recent?limit=6
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | number | 6 | จำนวนหนังสือที่ต้องการ |

**Response:**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "หนังสือใหม่ล่าสุด",
      "imageUrl": "/images/uuid.jpg",
      "pdfUrl": "/pdfs/uuid.pdf",
      "views": 50,
      "rating": 0,
      "tagId": "tag-uuid",
      "tag": {
        "id": "tag-uuid",
        "title": "สารคดี",
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z"
      },
      "createdAt": "2025-01-20T14:00:00.000Z",
      "updatedAt": "2025-01-20T14:00:00.000Z"
    }
  ]
}
```

---

## 3. Tags API (Categories)

### GET /tags
ดึงรายการหมวดหมู่ทั้งหมด พร้อมจำนวนหนังสือ

**Request:**
```
GET https://openread.ssnthailand.com/api/tags
```

**Response:**
```json
{
  "data": [
    {
      "id": "tag-uuid-1",
      "title": "นวนิยาย",
      "bookCount": 45,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-15T10:00:00.000Z"
    },
    {
      "id": "tag-uuid-2",
      "title": "สารคดี",
      "bookCount": 30,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-10T08:00:00.000Z"
    }
  ]
}
```

---

### GET /tags/{id}
ดึงรายละเอียดหมวดหมู่ พร้อมรายการหนังสือในหมวดหมู่

**Request:**
```
GET https://openread.ssnthailand.com/api/tags/tag-uuid-1
```

**Response (Success):**
```json
{
  "data": {
    "id": "tag-uuid-1",
    "title": "นวนิยาย",
    "books": [
      {
        "id": "book-uuid",
        "title": "นวนิยายรักโรแมนติก",
        "imageUrl": "/images/book.jpg",
        "pdfUrl": "/pdfs/book.pdf",
        "views": 1250,
        "rating": 5,
        "tagId": "tag-uuid-1",
        "createdAt": "2025-01-15T10:30:00.000Z",
        "updatedAt": "2025-01-18T08:00:00.000Z"
      }
    ],
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-15T10:00:00.000Z"
  }
}
```

**Response (Not Found):**
```json
{
  "success": false,
  "message": "ไม่พบหมวดหมู่ที่ต้องการ"
}
```

---

## 4. Search API

### GET /search
ค้นหาหนังสือและหมวดหมู่

**Request:**
```
GET https://openread.ssnthailand.com/api/search?q=นวนิยาย
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | คำค้นหา |

**Response:**
```json
{
  "books": [
    {
      "id": "book-uuid",
      "title": "นวนิยายรักโรแมนติก",
      "imageUrl": "/images/book.jpg",
      "pdfUrl": "/pdfs/book.pdf",
      "views": 1250,
      "rating": 5,
      "tagId": "tag-uuid",
      "tag": {
        "id": "tag-uuid",
        "title": "นวนิยาย",
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-18T08:00:00.000Z",
      "type": "book"
    }
  ],
  "tags": [
    {
      "id": "tag-uuid",
      "title": "นวนิยาย",
      "bookCount": 45,
      "type": "tag"
    }
  ]
}
```

**Response (Empty Query):**
```json
{
  "books": [],
  "tags": []
}
```

---

## Data Models

### Book
| Field | Type | Description |
|-------|------|-------------|
| id | string (UUID) | Primary Key |
| title | string | ชื่อหนังสือ (Unique) |
| imageUrl | string | URL รูปภาพหน้าปก |
| pdfUrl | string | URL ไฟล์ PDF |
| views | integer | จำนวนการเข้าชม (default: 0) |
| rating | integer | คะแนน (default: 0) |
| tagId | string | Foreign Key ไปยัง tag |
| tag | Tag | Relation ไปยังหมวดหมู่ |
| createdAt | datetime | วันที่สร้าง |
| updatedAt | datetime | วันที่แก้ไขล่าสุด |

### Tag (Category)
| Field | Type | Description |
|-------|------|-------------|
| id | string (UUID) | Primary Key |
| title | string | ชื่อหมวดหมู่ (Unique) |
| books | Book[] | Relation ไปยังหนังสือ |
| bookCount | integer | จำนวนหนังสือในหมวดหมู่ (computed) |
| createdAt | datetime | วันที่สร้าง |
| updatedAt | datetime | วันที่แก้ไขล่าสุด |

### Member
| Field | Type | Description |
|-------|------|-------------|
| id | string (UUID) | Primary Key |
| name | string | ชื่อสมาชิก |
| email | string | อีเมล (Unique, lowercase) |
| password | string | รหัสผ่าน (bcrypt hashed) |
| role | enum | บทบาท: "Normal" หรือ "Manager" |
| createdAt | datetime | วันที่สมัคร |
| updatedAt | datetime | วันที่แก้ไขล่าสุด |

---

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "message": "ไม่พบข้อมูลที่ต้องการ"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "เกิดข้อผิดพลาดภายในระบบ"
}
```

---

## Frontend URLs

| Page | URL |
|------|-----|
| หน้าแรก | / |
| รายละเอียดหนังสือ | /books/{id} |
| หมวดหมู่ทั้งหมด | /tags |
| หนังสือในหมวดหมู่ | /tags/{id} |
| เข้าสู่ระบบ | /auth/sign-in |
| สมัครสมาชิก | /auth/sign-up |
| จัดการหนังสือ (Manager) | /manager/books |
| สร้างหนังสือใหม่ (Manager) | /manager/books/create |
| แก้ไขหนังสือ (Manager) | /manager/books/{id} |
| สร้างหมวดหมู่ใหม่ (Manager) | /manager/tags/create |
| แก้ไขหมวดหมู่ (Manager) | /manager/tags/{id} |
| จัดการสมาชิก (Manager) | /manager/members |
| แก้ไขสมาชิก (Manager) | /manager/members/{id} |

---

## Tech Stack

- **Framework:** Next.js 15
- **UI Library:** Tailwind CSS
- **Database:** MySQL 8.0+
- **ORM:** Prisma 5.x
- **Session:** Iron-Session
- **Validation:** Zod
- **PDF Viewer:** react-pdf, react-pageflip
- **Language:** TypeScript

---

## CORS Configuration

API รองรับ Cross-Origin requests สำหรับการเรียกใช้จากเว็บอื่น

---

## Usage Examples

### JavaScript (Fetch)
```javascript
// ดึงหนังสือยอดนิยม
const response = await fetch('https://openread.ssnthailand.com/api/books/popular?limit=8');
const data = await response.json();
console.log(data.data); // Array of books

// ค้นหาหนังสือ
const searchResponse = await fetch('https://openread.ssnthailand.com/api/search?q=นวนิยาย');
const searchData = await searchResponse.json();
console.log(searchData.books); // Array of matching books
```

### cURL
```bash
# ดึงข้อมูล Dashboard
curl -X GET "https://openread.ssnthailand.com/api/dashboard"

# ดึงหนังสือพร้อม pagination
curl -X GET "https://openread.ssnthailand.com/api/books?page=1&per_page=10"

# ดึงหมวดหมู่ทั้งหมด
curl -X GET "https://openread.ssnthailand.com/api/tags"
```

---

## Postman Collection

Import endpoints ใน Postman:
1. สร้าง Collection ใหม่ชื่อ "OpenRead API"
2. เพิ่ม Environment Variable: `base_url` = `https://openread.ssnthailand.com/api`
3. สร้าง Request สำหรับแต่ละ endpoint

### Headers:
```
Accept: application/json
```

---

## Changelog

### v0.3.0 (Current)
- Added REST API routes for external access
- GET /api/dashboard - stats and featured content
- GET /api/books - list with pagination, search, filter
- GET /api/books/{id} - book details
- GET /api/books/popular - popular books
- GET /api/books/recent - recent books
- GET /api/tags - list all tags
- GET /api/tags/{id} - tag details with books
- GET /api/search - search books and tags

### v0.2.0
- Added delete functionality for books and tags
- Updated member management interface
- Green color scheme consistency

### v0.1.0
- Initial release
- Basic CRUD for books, tags, and members
- Authentication system
- PDF viewer with page flip
