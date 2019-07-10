
const ajax_delete_post = (id) =>{
    var xhr = new XMLHttpRequest();

    xhr.open('DELETE',`/posts/delete/${id}`,true);

    xhr.onload = ()=>{
        if (xhr.status === 200){
            window.location.href = '/';
        }
    };

    xhr.onerror = (err)=>{
        console.log(err);
    }

    xhr.send();
}

const delete_post = (e) =>{
    const btn = document.querySelector('#delete-post-btn');
    const id = btn.dataset.id;
    ajax_delete_post(id);
}