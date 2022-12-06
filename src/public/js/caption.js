



async function main(){
   let searchData  = [];


   /*		<tr class="active-row">
			<td>{{this.name}}</td>
			<td><a href="/captions/delete?id={{this.id}}" onclick="return confirm('Are you sure you want to delete this item?');">Delete</a> 
		</tr>

        */

        const response =await fetch('/api/captions');
        const json  = await response.json()

    searchData =[...json.data]
    console.log(searchData)
 
    const input = document.querySelector('#keyword_search');
    const tbody = document.querySelector('tbody');
    input.addEventListener('keydown', function(e){
       
        const filtered = searchData.filter(cap=>cap.name.toUpperCase().includes(e.target.value.toUpperCase()))
       tbody.innerHTML=''
       filtered.forEach(item=>{
        const tr = document.createElement('tr');
        tr.classList.add('active-row');
        tr.innerHTML =`
        <td>${item.name}</td>
			<td><a href="/captions/delete?id=${item._id}" onclick="return confirm('Are you sure you want to delete this item?');">Delete</a> 
        `;
        tbody.appendChild(tr);
       })

    })
}

document.addEventListener('DOMContentLoaded',main);