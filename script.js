document.getElementById('text-editor').addEventListener('input', function() {
    updateLineCount();
});

// 页面加载时恢复标题和文本内容
window.onload = function() {
    var textArea = document.getElementById('text-editor');
    var titleElement = document.querySelector('h1[contenteditable]');
    var savedTitle = localStorage.getItem('textEditorTitle');
    var savedContent = localStorage.getItem('textEditorContent');
    
    if (savedTitle) {
        titleElement.innerText = savedTitle; // 恢复标题
    }
    if (savedContent) {
        textArea.value = savedContent; // 恢复文本内容
        updateLineCount(); // 更新行数显示
    }
};


function updateLineCount() {
    var textArea = document.getElementById('text-editor');
    var lines = textArea.value.split('\n').length;
    document.getElementById('line-count').innerText = lines;
}

function copyText() {
    var textArea = document.getElementById('text-editor');
    textArea.select();
    document.execCommand('copy');
    alert('文本已复制到剪贴板！');
}

// ... 原有updateLineCount和copyText函数不变 ...

function clearText() {
    var textArea = document.getElementById('text-editor');
    textArea.value = ''; // 清空文本框内容
    updateLineCount(); // 更新行数显示，确保行数正确反映清空后的状态
}

// ... 原有addEventListener和其他代码不变 ...

// 页面加载时恢复上次保存的数据
window.onload = function() {
    var textArea = document.getElementById('text-editor');
    var savedContent = localStorage.getItem('textEditorContent');
    if (savedContent) {
        textArea.value = savedContent;
        updateLineCount(); // 更新行数显示
    }
};


function saveText() {
    var textArea = document.getElementById('text-editor');
    var titleElement = document.querySelector('h1[contenteditable]');
    var content = textArea.value;

    // 保存标题到localStorage
    localStorage.setItem('textEditorTitle', titleElement.innerText.trim());
    // 保存文本内容到localStorage
    localStorage.setItem('textEditorContent', content);

    alert('标题和内容已保存！');
}
// ... 原有的updateLineCount, copyText, 和 clearText函数不变 ...

function exportText() {
    var textArea = document.getElementById('text-editor');
    var titleElement = document.querySelector('h1[contenteditable]');
    var filename = titleElement.innerText.trim().replace(/ /g, '_') + '.txt'; // 文件名替换空格为下划线，并加上.txt后缀
    var content = textArea.value;

    // 创建一个Blob对象，包含文本内容
    var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    
    // 创建一个隐藏的可下载链接
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.style.display = "none";

    // 将链接添加到DOM中，然后模拟点击下载
    document.body.appendChild(link);
    link.click();

    // 下载后清理
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    alert('文件已导出！');
}

document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('.copyright');
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = `&copy; 2024 - ${currentYear} 年 jy文本编辑器. All rights reserved.`;
});
