function toggleContent(id) {
    const content = document.getElementById(id);
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
    } else {
        content.classList.add('hidden');
    }
}