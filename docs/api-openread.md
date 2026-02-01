# OpenRead API Documentation

## Base URL
```
https://openread.ssnthailand.com/api
```

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
      "id": "uuid-string",
      "title": "หนังสือยอดนิยม",
      "imageUrl": "/images/uuid.jpg",
      "pdfUrl": "/pdfs/uuid.pdf",
      "views": 1500,
      "rating": 5,
      "tagId": "tag-uuid",
      "tag": {
        "id": "tag-uuid",
        "title": "หมวดหมู่"
      },
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ],
  "recent_books": [
    {
      "id": "uuid-string",
      "title": "หนังสือล่าสุด",
      "imageUrl": "/images/uuid.jpg",
      "pdfUrl": "/pdfs/uuid.pdf",
      "views": 100,
      "rating": 4,
      "tagId": "tag-uuid",
      "tag": {
        "id": "tag-uuid",
        "title": "หมวดหมู่"
      },
      "createdAt": "2025-01-20T14:00:00Z"
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
ดึงรายการหนังสือทั้งหมด

**Request:**
```
GET https://openread.ssnthailand.com/api/books?page=1&per_page=10&search=นวนิยาย
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | หน้าที่ต้องการ (default: 1) |
| per_page | number | จำนวนต่อหน้า (default: 10) |
| search | string | คำค้นหาในชื่อหนังสือ |
| tag_id | string | กรองตามหมวดหมู่ |

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
        "title": "นวนิยาย"
      },
      "createdAt": "2025-01-15T10:30:00Z",
      "updatedAt": "2025-01-18T08:00:00Z"
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

### GET /books/{id}
ดึงรายละเอียดหนังสือ

**Request:**
```
GET https://openread.ssnthailand.com/api/books/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
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
      "title": "นวนิยาย"
    },
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-01-18T08:00:00Z"
  }
}
```

### GET /books/popular
ดึงหนังสือยอดนิยม

**Request:**
```
GET https://openread.ssnthailand.com/api/books/popular?limit=8
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| limit | number | จำนวนหนังสือ (default: 8) |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid-string",
      "title": "หนังสือยอดนิยมอันดับ 1",
      "imageUrl": "/images/uuid.jpg",
      "views": 5000,
      "rating": 5,
      "tag": {
        "id": "tag-uuid",
        "title": "นวนิยาย"
      }
    }
  ]
}
```

### GET /books/recent
ดึงหนังสือล่าสุด

**Request:**
```
GET https://openread.ssnthailand.com/api/books/recent?limit=6
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| limit | number | จำนวนหนังสือ (default: 6) |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid-string",
      "title": "หนังสือใหม่ล่าสุด",
      "imageUrl": "/images/uuid.jpg",
      "views": 50,
      "rating": 0,
      "tag": {
        "id": "tag-uuid",
        "title": "สารคดี"
      },
      "createdAt": "2025-01-20T14:00:00Z"
    }
  ]
}
```

### POST /books
สร้างหนังสือใหม่ (เฉพาะ Manager)

**Request:**
```
POST https://openread.ssnthailand.com/api/books
Content-Type: multipart/form-data
```

**Form Data:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | ✓ | ชื่อหนังสือ (ต้องไม่ซ้ำ) |
| tagId | string | ✓ | ID ของหมวดหมู่ |
| imageFile | File | ✓ | ไฟล์รูปภาพหน้าปก |
| pdfFile | File | ✓ | ไฟล์ PDF หนังสือ |

**Response:**
```json
{
  "success": true,
  "message": "เพิ่มหนังสือสำเร็จ",
  "data": {
    "id": "new-uuid",
    "title": "หนังสือใหม่",
    "imageUrl": "/images/new-uuid.jpg",
    "pdfUrl": "/pdfs/new-uuid.pdf"
  }
}
```

### PUT /books/{id}
แก้ไขหนังสือ (เฉพาะ Manager)

**Request:**
```
PUT https://openread.ssnthailand.com/api/books/550e8400-e29b-41d4-a716-446655440000
Content-Type: multipart/form-data
```

**Form Data:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | ✓ | ชื่อหนังสือ |
| tagId | string | ✓ | ID ของหมวดหมู่ |
| imageFile | File | | ไฟล์รูปภาพใหม่ (ถ้าต้องการเปลี่ยน) |
| pdfFile | File | | ไฟล์ PDF ใหม่ (ถ้าต้องการเปลี่ยน) |

**Response:**
```json
{
  "success": true,
  "message": "แก้ไขหนังสือสำเร็จ"
}
```

### DELETE /books/{id}
ลบหนังสือ (เฉพาะ Manager)

**Request:**
```
DELETE https://openread.ssnthailand.com/api/books/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "success": true,
  "message": "ลบหนังสือสำเร็จ"
}
```

### POST /books/{id}/view
เพิ่มจำนวนการเข้าชม

**Request:**
```
POST https://openread.ssnthailand.com/api/books/550e8400-e29b-41d4-a716-446655440000/view
```

**Response:**
```json
{
  "success": true,
  "views": 1251
}
```

### PUT /books/{id}/rating
ให้คะแนนหนังสือ

**Request:**
```
PUT https://openread.ssnthailand.com/api/books/550e8400-e29b-41d4-a716-446655440000/rating
Content-Type: application/json
```

**Body:**
```json
{
  "stars": 5
}
```

**Response:**
```json
{
  "success": true,
  "message": "ให้คะแนนสำเร็จ",
  "rating": 5
}
```

---

## 3. Tags API (Categories)

### GET /tags
ดึงรายการหมวดหมู่ทั้งหมด

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
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "tag-uuid-2",
      "title": "สารคดี",
      "bookCount": 30,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-10T08:00:00Z"
    }
  ]
}
```

### GET /tags/{id}
ดึงรายละเอียดหมวดหมู่

**Request:**
```
GET https://openread.ssnthailand.com/api/tags/tag-uuid-1
```

**Response:**
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
        "views": 1250,
        "rating": 5
      }
    ],
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
}
```

### POST /tags
สร้างหมวดหมู่ใหม่ (เฉพาะ Manager)

**Request:**
```
POST https://openread.ssnthailand.com/api/tags
Content-Type: application/json
```

**Body:**
```json
{
  "title": "หมวดหมู่ใหม่"
}
```

**Response:**
```json
{
  "success": true,
  "message": "เพิ่มหมวดหมู่สำเร็จ",
  "data": {
    "id": "new-tag-uuid",
    "title": "หมวดหมู่ใหม่"
  }
}
```

### PUT /tags/{id}
แก้ไขหมวดหมู่ (เฉพาะ Manager)

**Request:**
```
PUT https://openread.ssnthailand.com/api/tags/tag-uuid-1
Content-Type: application/json
```

**Body:**
```json
{
  "title": "ชื่อหมวดหมู่ใหม่"
}
```

**Response:**
```json
{
  "success": true,
  "message": "แก้ไขหมวดหมู่สำเร็จ"
}
```

### DELETE /tags/{id}
ลบหมวดหมู่ (เฉพาะ Manager)

**Request:**
```
DELETE https://openread.ssnthailand.com/api/tags/tag-uuid-1
```

**Response (Success):**
```json
{
  "success": true,
  "message": "ลบหมวดหมู่สำเร็จ"
}
```

**Response (Error - มีหนังสืออยู่):**
```json
{
  "success": false,
  "message": "ไม่สามารถลบหมวดหมู่ได้ เนื่องจากมีหนังสือ 5 เล่มอยู่ในหมวดหมู่นี้"
}
```

---

## 4. Members API

### GET /members
ดึงรายการสมาชิกทั้งหมด (เฉพาะ Manager)

**Request:**
```
GET https://openread.ssnthailand.com/api/members?page=1&per_page=10&search=john
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | หน้าที่ต้องการ (default: 1) |
| per_page | number | จำนวนต่อหน้า (default: 10) |
| search | string | ค้นหาจากชื่อหรืออีเมล |

**Response:**
```json
{
  "data": [
    {
      "id": "member-uuid",
      "name": "สมชาย ใจดี",
      "email": "somchai@example.com",
      "role": "Normal",
      "createdAt": "2025-01-10T08:00:00Z",
      "updatedAt": "2025-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 50,
    "per_page": 10,
    "total": 500
  }
}
```

### GET /members/{id}
ดึงรายละเอียดสมาชิก (เฉพาะ Manager)

**Request:**
```
GET https://openread.ssnthailand.com/api/members/member-uuid
```

**Response:**
```json
{
  "data": {
    "id": "member-uuid",
    "name": "สมชาย ใจดี",
    "email": "somchai@example.com",
    "role": "Normal",
    "createdAt": "2025-01-10T08:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
}
```

### PUT /members/{id}
แก้ไขข้อมูลสมาชิก (เฉพาะ Manager)

**Request:**
```
PUT https://openread.ssnthailand.com/api/members/member-uuid
Content-Type: application/json
```

**Body:**
```json
{
  "name": "สมชาย ใจดีมาก",
  "email": "somchai.new@example.com",
  "role": "Manager"
}
```

**Response:**
```json
{
  "success": true,
  "message": "แก้ไขข้อมูลสมาชิกสำเร็จ"
}
```

---

## 5. Authentication API

### POST /auth/sign-in
เข้าสู่ระบบ

**Request:**
```
POST https://openread.ssnthailand.com/api/auth/sign-in
Content-Type: application/json
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "เข้าสู่ระบบสำเร็จ",
  "data": {
    "id": "member-uuid",
    "name": "สมชาย ใจดี",
    "email": "user@example.com",
    "isManager": false
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
}
```

### POST /auth/sign-up
ลงทะเบียนสมาชิกใหม่

**Request:**
```
POST https://openread.ssnthailand.com/api/auth/sign-up
Content-Type: application/json
```

**Body:**
```json
{
  "name": "สมหญิง รักอ่าน",
  "email": "somying@example.com",
  "password": "securepassword123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "สมัครสมาชิกสำเร็จ"
}
```

**Response (Error - อีเมลซ้ำ):**
```json
{
  "success": false,
  "message": "อีเมลนี้ถูกใช้งานแล้ว"
}
```

### POST /auth/logout
ออกจากระบบ

**Request:**
```
POST https://openread.ssnthailand.com/api/auth/logout
```

**Response:**
```json
{
  "success": true,
  "message": "ออกจากระบบสำเร็จ"
}
```

### GET /auth/session
ตรวจสอบ Session ปัจจุบัน

**Request:**
```
GET https://openread.ssnthailand.com/api/auth/session
```

**Response (Logged In):**
```json
{
  "isLoggedIn": true,
  "data": {
    "id": "member-uuid",
    "name": "สมชาย ใจดี",
    "email": "user@example.com",
    "isManager": true
  }
}
```

**Response (Not Logged In):**
```json
{
  "isLoggedIn": false,
  "data": null
}
```

---

## 6. Search API

### GET /search
ค้นหาข้อมูลทั้งหมด

**Request:**
```
GET https://openread.ssnthailand.com/api/search?q=นวนิยาย
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| q | string | คำค้นหา |

**Response:**
```json
{
  "books": [
    {
      "id": "book-uuid",
      "title": "นวนิยายรักโรแมนติก",
      "imageUrl": "/images/book.jpg",
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

## Role Values

| Value | Label | Description |
|-------|-------|-------------|
| Normal | สมาชิกทั่วไป | สามารถอ่านหนังสือและให้คะแนนได้ |
| Manager | ผู้จัดการ | สามารถจัดการหนังสือ หมวดหมู่ และสมาชิกได้ |

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "ข้อมูลไม่ถูกต้อง",
  "errors": [
    { "field": "title", "message": "กรุณากรอกชื่อหนังสือ" }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "กรุณาเข้าสู่ระบบ"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "คุณไม่มีสิทธิ์ในการดำเนินการนี้"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "ไม่พบข้อมูลที่ต้องการ"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "ชื่อหนังสือนี้มีอยู่แล้ว"
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
| รายการหนังสือ | /books |
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

## File Upload Specifications

### Image Files
- **Allowed Types:** JPG, JPEG, PNG, GIF, WebP
- **Max Size:** 15 MB
- **Storage Path:** `/public/images/`
- **Naming:** UUID-based (e.g., `550e8400-e29b-41d4-a716-446655440000.jpg`)

### PDF Files
- **Allowed Types:** PDF
- **Max Size:** 15 MB
- **Storage Path:** `/public/pdfs/`
- **Naming:** UUID-based (e.g., `550e8400-e29b-41d4-a716-446655440000.pdf`)

---

## Security Features

- Password hashing with bcrypt (10 rounds)
- Server-side session validation (iron-session)
- Secure HTTP-only cookies
- Role-based access control (RBAC)
- Email uniqueness constraints
- HTTPS-only cookie transmission
- Input validation with Zod schemas

---

## Deployment

### Plesk Panel

1. Upload files to server
2. Install dependencies: `npm install`
3. Generate Prisma client: `npx prisma generate`
4. Run migrations: `npx prisma migrate deploy`
5. Build: `npm run build`
6. Start: `npm start`

### Environment Variables
```
DATABASE_URL="mysql://user:password@localhost:3306/openread"
SESSION_SECRET="your-32-character-or-longer-secret-key"
NODE_ENV=production
PORT=3000
```

---

## Postman Collection

Import endpoints ใน Postman:
1. สร้าง Collection ใหม่ชื่อ "OpenRead API"
2. เพิ่ม Environment Variable: `base_url` = `https://openread.ssnthailand.com/api`
3. สร้าง Request สำหรับแต่ละ endpoint

### Headers:
```
Content-Type: application/json
Accept: application/json
```

### For File Upload:
```
Content-Type: multipart/form-data
```

---

## Rate Limiting

ยังไม่มีการกำหนด Rate Limiting ในเวอร์ชันปัจจุบัน

---

## Changelog

### v0.2.0 (Current)
- Added delete functionality for books and tags
- Updated member management interface
- Green color scheme consistency

### v0.1.0
- Initial release
- Basic CRUD for books, tags, and members
- Authentication system
- PDF viewer with page flip
