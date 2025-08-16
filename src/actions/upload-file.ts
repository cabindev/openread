// import { writeFile } from "fs/promises";

// export async function uploadFile(file: File, type: "images" | "pdfs"): Promise<string> {
//     try {
//         const fileName = file.name.replace(" ", "_");
//         const filePathDir = `./public/${type}/${fileName}`;
//         const filePath = `/${type}/${fileName}`;
//         const arrayBuffer = await file.arrayBuffer();
//         const buffer = new Uint8Array(arrayBuffer);

//         await writeFile(filePathDir, buffer);

//         return filePath;
//     } catch (error) {
//         console.log(error);
//         throw new Error("Upload file error");
//     }
// }
"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export async function uploadFile(file: File, type: "images" | "pdfs") {
    try {
        // สร้างชื่อไฟล์ใหม่ด้วย UUID และนามสกุลเดิม
        const extension = file.name.split('.').pop();
        const uniqueFileName = `${randomUUID()}.${extension}`;
        
        // สร้าง path ตาม type ที่กำหนด
        const dirPath = join(process.cwd(), "public", type);
        const filePathDir = join(dirPath, uniqueFileName);
        const filePath = `/${type}/${uniqueFileName}`;
        
        // สร้างโฟลเดอร์ถ้ายังไม่มี
        await mkdir(dirPath, { recursive: true });
        
        // แปลงไฟล์และบันทึก
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        await writeFile(filePathDir, buffer);

        return filePath;
    } catch (error) {
        console.error("Upload error:", error);
        throw new Error("Upload file error");
    }
}