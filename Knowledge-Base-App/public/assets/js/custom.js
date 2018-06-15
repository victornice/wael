window.onload = function() {
    let elements = document.querySelectorAll('.card-content p')
    elements.forEach(element => {
        function truncateText(maxLength) {
                    let truncated = element.innerText;
                    if (truncated.length > maxLength) {
                        truncated = truncated.substr(0,maxLength) + '...';
                    }
                    return truncated;
        };
        element.innerText = truncateText(130)
    });

    let upload = document.querySelector('.upload')

    upload.onchange = () => {
        let file = upload.files[0];
        let size = (file.size / 1048576).toFixed(2);
        document.querySelector('.upload-text').innerHTML = file.name + ` ( ${size}MB )`;
        console.log(size)
    }

    let padge = document.querySelector('.badge');
    let close = document.querySelector('.badge .fa');

    if (close) {
        function fadeOut() {
            var op = 1;  // initial opacity
            var timer = setInterval(function () {
                if (op <= 0.1){
                    clearInterval(timer);
                    padge.remove();
                }
                padge.style.opacity = op;
                op -= 0.01;
            }, 5);
        }
        var delay = setTimeout(() => {
            fadeOut()
        }, 3000);
        close.onclick = function (){
            fadeOut();
            clearTimeout(delay)
        }
    }

    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);

    let deleteArticle = document.querySelector('.delete');
    if (deleteArticle) {
        deleteArticle.addEventListener('click', (e) => {
            let targetArticle = e.target;
            let id = targetArticle.getAttribute('data-id');
    
            fetch('/article/' + id, {
                method: 'DELETE'
            })
            .then((res) => {
                alert('Deleting Article');
                window.location.href = '/';
            })
            .catch((error) => {
                console.error(error);
            })
        });
    }
}