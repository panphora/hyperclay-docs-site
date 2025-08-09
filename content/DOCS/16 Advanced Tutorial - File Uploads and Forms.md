---
title: 16. Advanced Tutorial - File Uploads and Forms
publish: true
description: Build sophisticated interactions with Hyperclay's file upload and form submission capabilities for portfolio and contact forms
---

# Advanced Tutorial: File Uploads and Forms

Learn how to build sophisticated interactions with Hyperclay's file upload and form submission capabilities. We'll create a portfolio site where visitors can contact you and you can manage your projects with images.

## What We'll Build

A personal portfolio site featuring:
- Image gallery with drag-and-drop uploads
- Contact form that emails you
- Project management with rich media
- Progress indicators and user feedback
- Admin-only upload capabilities

## Starting Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <script src="https://hyperclay.com/js/hyperclay-starter-kit.js" type="module"></script>
    <style>
        * { box-sizing: border-box; }
        body { 
            font-family: system-ui; 
            line-height: 1.6; 
            margin: 0;
            background: #f5f5f5;
        }
        .container { 
            max-width: 1000px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .project {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .gallery img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 4px;
            cursor: pointer;
        }
        .upload-zone {
            border: 2px dashed #ddd;
            padding: 40px;
            text-align: center;
            margin: 20px 0;
            border-radius: 8px;
            transition: all 0.3s;
        }
        .upload-zone.dragover {
            border-color: #007bff;
            background: #f0f8ff;
        }
        .contact-form {
            background: white;
            padding: 30px;
            border-radius: 8px;
            margin: 40px 0;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .btn {
            background: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .btn:hover {
            background: #0056b3;
        }
        .progress-bar {
            width: 100%;
            height: 4px;
            background: #ddd;
            border-radius: 2px;
            overflow: hidden;
            margin: 10px 0;
        }
        .progress-bar-fill {
            height: 100%;
            background: #007bff;
            transition: width 0.3s;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 edit-mode-contenteditable>John Doe - Portfolio</h1>
        
        <!-- Admin Controls -->
        <div option:editmode="true" style="margin: 20px 0;">
            <button class="btn" onclick="addProject()">Add New Project</button>
        </div>
        
        <!-- Projects Section -->
        <section id="projects">
            <!-- Project Template (hidden) -->
            <div class="project" style="display: none;">
                <h2 edit-mode-contenteditable>New Project</h2>
                <p edit-mode-contenteditable>Project description goes here...</p>
                
                <!-- Image Gallery -->
                <div class="gallery" sortable="images"></div>
                
                <!-- Upload Zone (Admin Only) -->
                <div class="upload-zone" option:editmode="true"
                     ondrop="handleDrop(event, this)"
                     ondragover="handleDragOver(event, this)"
                     ondragleave="handleDragLeave(event, this)">
                    <p>Drag & drop images here or</p>
                    <input type="file" 
                           accept="image/*" 
                           multiple 
                           onchange="handleFileSelect(event, this)"
                           style="display: none;">
                    <button class="btn" onclick="this.previousElementSibling.click()">
                        Choose Files
                    </button>
                    <div class="progress-bar" style="display: none;">
                        <div class="progress-bar-fill"></div>
                    </div>
                </div>
                
                <!-- Admin Actions -->
                <div option:editmode="true" style="margin-top: 20px;">
                    <button class="btn" onclick="this.closest('.project').remove()">
                        Delete Project
                    </button>
                </div>
            </div>
        </section>
        
        <!-- Contact Form -->
        <section class="contact-form">
            <h2>Get In Touch</h2>
            <form onbeforesubmit="return validateForm(this)"
                  onresponse="handleContactResponse(res)">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <textarea name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn">Send Message</button>
            </form>
        </section>
    </div>
    
    <script>
        // Project Management
        function addProject() {
            const template = document.querySelector('.project');
            const newProject = template.cloneNode(true);
            newProject.style.display = 'block';
            document.getElementById('projects').appendChild(newProject);
            toast('New project added!');
        }
        
        // File Upload Handling
        async function handleFileSelect(event, uploadZone) {
            const files = event.target.files;
            await uploadFiles(files, uploadZone);
        }
        
        function handleDragOver(event, element) {
            event.preventDefault();
            element.classList.add('dragover');
        }
        
        function handleDragLeave(event, element) {
            element.classList.remove('dragover');
        }
        
        async function handleDrop(event, uploadZone) {
            event.preventDefault();
            uploadZone.classList.remove('dragover');
            
            const files = event.dataTransfer.files;
            await uploadFiles(files, uploadZone);
        }
        
        async function uploadFiles(files, uploadZone) {
            const gallery = uploadZone.closest('.project').querySelector('.gallery');
            const progressBar = uploadZone.querySelector('.progress-bar');
            const progressFill = uploadZone.querySelector('.progress-bar-fill');
            
            // Show progress bar
            progressBar.style.display = 'block';
            progressFill.style.width = '0%';
            
            let uploaded = 0;
            const total = files.length;
            
            for (const file of files) {
                try {
                    // Upload file with progress tracking
                    const result = await hyperclay.uploadFileBasic(file, {
                        onProgress: (percent) => {
                            const totalProgress = ((uploaded + percent/100) / total) * 100;
                            progressFill.style.width = totalProgress + '%';
                        },
                        onComplete: (result) => {
                            // Add image to gallery
                            const img = document.createElement('img');
                            img.src = result.url;
                            img.alt = result.name;
                            img.onclick = () => viewImage(result.url);
                            gallery.appendChild(img);
                            
                            uploaded++;
                            toast(`Uploaded ${result.name}`);
                        },
                        onError: (error) => {
                            toast(`Failed to upload ${file.name}`, 'error');
                            console.error(error);
                        }
                    });
                } catch (error) {
                    toast(`Error uploading ${file.name}`, 'error');
                }
            }
            
            // Hide progress bar after completion
            setTimeout(() => {
                progressBar.style.display = 'none';
            }, 1000);
        }
        
        // Image Viewer
        function viewImage(url) {
            const viewer = document.createElement('div');
            viewer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                cursor: pointer;
            `;
            viewer.onclick = () => viewer.remove();
            
            const img = document.createElement('img');
            img.src = url;
            img.style.cssText = 'max-width: 90%; max-height: 90%; object-fit: contain;';
            
            viewer.appendChild(img);
            document.body.appendChild(viewer);
        }
        
        // Contact Form Handling
        async function validateForm(form) {
            // Get form data
            const data = getDataFromForm(form);
            
            // Basic validation
            if (data.message.length < 10) {
                toast('Please write a longer message', 'error');
                return false;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Send message to site owner
                await hyperclay.sendMessage(data, 
                    'Thank you! Your message has been sent.',
                    () => {
                        // Reset form
                        form.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                );
            } catch (error) {
                toast('Failed to send message', 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
            
            return false; // Prevent default form submission
        }
        
        function handleContactResponse(res) {
            console.log('Contact form response:', res);
        }
        
        // Advanced File Creation Example
        async function createAndUploadJSON() {
            const projectData = {
                title: document.querySelector('h1').textContent,
                projects: Array.from(document.querySelectorAll('.project:not([style*="display: none"])')).map(project => ({
                    name: project.querySelector('h2').textContent,
                    description: project.querySelector('p').textContent,
                    images: Array.from(project.querySelectorAll('.gallery img')).map(img => img.src)
                })),
                exportDate: new Date().toISOString()
            };
            
            try {
                const result = await hyperclay.createFile({
                    fileName: 'portfolio-backup-' + Date.now() + '.json',
                    fileBody: JSON.stringify(projectData, null, 2)
                });
                
                // Create download link
                const link = document.createElement('a');
                link.href = result.url;
                link.download = result.name;
                link.textContent = 'Download Backup';
                link.className = 'btn';
                
                // Show in UI
                const backupMsg = document.createElement('div');
                backupMsg.innerHTML = `
                    <p>Backup created successfully!</p>
                    ${link.outerHTML}
                `;
                
                consent('Backup created! Download now?', () => {
                    link.click();
                }, backupMsg.innerHTML);
                
            } catch (error) {
                toast('Failed to create backup', 'error');
            }
        }
        
        // Add backup button for admins
        document.addEventListener('DOMContentLoaded', () => {
            if (hyperclay.isEditMode()) {
                const backupBtn = document.createElement('button');
                backupBtn.className = 'btn';
                backupBtn.textContent = 'Backup Portfolio';
                backupBtn.onclick = createAndUploadJSON;
                backupBtn.style.marginLeft = '10px';
                
                document.querySelector('[option\\:editmode="true"]').appendChild(backupBtn);
            }
        });
    </script>
</body>
</html>
```

## Key Concepts Demonstrated

### 1. File Upload with Progress

The `uploadFileBasic` method provides granular control:

```javascript
await hyperclay.uploadFileBasic(file, {
    onProgress: (percent) => {
        progressBar.style.width = percent + '%';
    },
    onComplete: (result) => {
        console.log('Uploaded:', result.url);
    },
    onError: (error) => {
        console.error('Upload failed:', error);
    }
});
```

### 2. Drag and Drop Interface

Native HTML5 drag-and-drop with visual feedback:

```javascript
function handleDrop(event, uploadZone) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    // Process files...
}
```

### 3. Contact Form with sendMessage

Send visitor messages to the site owner:

```javascript
await hyperclay.sendMessage(formData, 
    'Success message',
    () => {
        // Success callback
        form.reset();
    }
);
```

### 4. Creating Files Programmatically

Generate and upload files on the fly:

```javascript
const result = await hyperclay.createFile({
    fileName: 'data.json',
    fileBody: JSON.stringify(data)
});
```

## Advanced Patterns

### Batch Processing with Queue

```javascript
class UploadQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
        this.concurrent = 3; // Upload 3 files at once
    }
    
    add(files) {
        this.queue.push(...files);
        if (!this.processing) {
            this.process();
        }
    }
    
    async process() {
        this.processing = true;
        
        while (this.queue.length > 0) {
            const batch = this.queue.splice(0, this.concurrent);
            const uploads = batch.map(file => 
                hyperclay.uploadFile(file).catch(err => ({error: err, file}))
            );
            
            const results = await Promise.all(uploads);
            
            results.forEach(result => {
                if (result.error) {
                    toast(`Failed: ${result.file.name}`, 'error');
                } else {
                    this.onUploadComplete?.(result);
                }
            });
        }
        
        this.processing = false;
    }
}

const uploadQueue = new UploadQueue();
uploadQueue.onUploadComplete = (result) => {
    addImageToGallery(result.url);
};
```

### Image Processing Before Upload

```javascript
async function resizeAndUpload(file) {
    // Create canvas for resizing
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Load image
    await new Promise((resolve) => {
        img.onload = resolve;
        img.src = URL.createObjectURL(file);
    });
    
    // Resize to max 1200px width
    const maxWidth = 1200;
    const scale = Math.min(1, maxWidth / img.width);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    
    // Draw resized image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Convert to blob
    const blob = await new Promise(resolve => 
        canvas.toBlob(resolve, 'image/jpeg', 0.85)
    );
    
    // Upload resized image
    const resizedFile = new File([blob], file.name, { type: 'image/jpeg' });
    return await hyperclay.uploadFile(resizedFile);
}
```

### Form with File Attachments

```javascript
async function handleFormWithFiles(event) {
    event.preventDefault();
    const form = event.target;
    const data = getDataFromForm(form);
    
    // Upload attachments first
    const fileInput = form.querySelector('input[type="file"]');
    const attachments = [];
    
    if (fileInput.files.length > 0) {
        toast('Uploading attachments...');
        
        for (const file of fileInput.files) {
            try {
                const result = await hyperclay.uploadFile(file);
                attachments.push({
                    name: result.name,
                    url: result.url
                });
            } catch (error) {
                toast(`Failed to upload ${file.name}`, 'error');
                return;
            }
        }
    }
    
    // Add attachments to form data
    data.attachments = attachments;
    
    // Send complete message
    await hyperclay.sendMessage(data, 
        'Message sent with ' + attachments.length + ' attachments!'
    );
}
```

### Dynamic File Generation

```javascript
// Generate CSV from table data
function exportTableAsCSV() {
    const table = document.querySelector('table');
    const rows = Array.from(table.querySelectorAll('tr'));
    
    const csv = rows.map(row => {
        const cells = Array.from(row.querySelectorAll('td, th'));
        return cells.map(cell => `"${cell.textContent}"`).join(',');
    }).join('\n');
    
    hyperclay.createFile({
        fileName: 'export-' + new Date().toISOString() + '.csv',
        fileBody: csv
    }).then(result => {
        const link = document.createElement('a');
        link.href = result.url;
        link.download = result.name;
        link.click();
    });
}
```

## Best Practices

### 1. User Feedback

Always provide clear feedback during operations:

```javascript
// Visual upload state
uploadZone.classList.add('uploading');
uploadZone.innerHTML = '<div class="spinner"></div> Uploading...';

// Progress updates
toast(`Uploading ${current} of ${total} files...`);

// Success/error states
uploadZone.classList.add('success');
setTimeout(() => uploadZone.classList.remove('success'), 2000);
```

### 2. Error Handling

Handle errors gracefully:

```javascript
try {
    const result = await hyperclay.uploadFile(file);
    // Success handling
} catch (error) {
    if (error.message.includes('size')) {
        toast('File too large. Max size is 10MB', 'error');
    } else if (error.message.includes('type')) {
        toast('Invalid file type', 'error');
    } else {
        toast('Upload failed. Please try again.', 'error');
    }
}
```

### 3. File Validation

Validate before uploading:

```javascript
function validateFile(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
    if (file.size > maxSize) {
        throw new Error('File too large');
    }
    
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type');
    }
    
    return true;
}
```

### 4. Optimize for Mobile

Make uploads mobile-friendly:

```javascript
// Camera capture for mobile
<input type="file" 
       accept="image/*" 
       capture="environment"
       onchange="handleMobilePhoto(event)">

// Touch-friendly drop zones
.upload-zone {
    min-height: 150px; /* Larger touch target */
    padding: 40px;
}
```

## Security Notes

- File uploads are only available to site owners
- Files are automatically scanned for security
- URLs are unique and unguessable
- Consider file type restrictions for your use case

## Next Steps

- Combine file uploads with `onbeforesave` for cleanup
- Create rich media editors with inline image insertion
- Build file management interfaces with deletion
- Implement image galleries with lightbox effects

Happy building with Hyperclay's advanced features!