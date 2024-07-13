document.getElementById('text-editor').addEventListener('input', function() {
    updateLineCount();
});

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

    // 动态更新当前年份
    const yearElement = document.querySelector('.copyright');
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = `&copy; 2024 - ${currentYear} 年 jy文本编辑器. All rights reserved.`;
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

function clearText() {
    var textArea = document.getElementById('text-editor');
    textArea.value = ''; // 清空文本框内容
    updateLineCount(); // 更新行数显示，确保行数正确反映清空后的状态
}

function saveText() {
    var textArea = document.getElementById('text-editor');
    var titleElement = document.querySelector('h1[contenteditable]');
    var content = textArea.value;

    // 保存标题和文本到localStorage
    localStorage.setItem('textEditorTitle', titleElement.innerText.trim());
    localStorage.setItem('textEditorContent', content);

    alert('标题和内容已保存！');
}

function exportText() {
    var textArea = document.getElementById('text-editor');
    var titleElement = document.querySelector('h1[contenteditable]');
    var filename = titleElement.innerText.trim().replace(/ /g, '_') + '.txt';
    var content = textArea.value;

    var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    alert('文件已导出！');
}
