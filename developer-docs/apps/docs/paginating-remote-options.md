---
updatedAt: 2025-10-23T05:08:25.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Paginating remote options

If your field returns many remote options, you can use pagination to return them in smaller batches.

# Reference

The payload contains a `pageRequestData` parameter that identifies the page used for your request.

```json
{
  recipeId: 30019598123,
  integrationId: 72966189123,
  automationId: 72966189123,
  pageRequestData: {},
  dependencyData: null
}
```

If you want to use pagination, the response must contain:

* Your `options` as an array of key-value pairs where each option should have a `title` and `value`
* The `isPaginated` parameter (boolean)
* The `nextPageRequestData` containing metadata for the following page. Your app is responsible for defining how it wants the next page fetched. This approach lets you be flexible – you can choose to get the next page by page number or a cursor.
  * If the user requests more options, the value of `nextPageRequestData` will be sent in the next request as `pageRequestData`.

# Example

Here are two implementations that get a list of users from an external API:

```javascript Generic
app.post("/fetchRemoteOptions", async function(req, res) {
  // de-structure request payload
  const pageLimit = 10;
  const { payload } = req.body;
  const { pageRequestData } = payload;
  const { page = 1 } = pageRequestData;

  // call external API
  const response = await fetch(`https://yourApi.com/users?page=${page}&limit=${pageLimit}`);
  const myUsers = await response.json();

  // generate array of options
  const options =  myUsers.map((user) => {
    const value = {
      title: user.name,
      value: user.id
    }
    return { value, title: user.name };
  });
		  
  const nextPageRequestData = options.length === 0 ? null : { page: page + 1};
	
  // return HTTP response
  res.status(200).send({
    options, 			
    isPaginated: true,
    nextPageRequestData
  });
})
```
```javascript Github
const getRepositories = async (token, payload) => {
  const octokit = new Octokit({ auth: token });
  const { pageRequestData } = payload;
  const { page = 1 } = pageRequestData;
  const reposResponse = await octokit.repos.list({per_page: YOUR_MAGIC_NUMBER, page });
  const repos = reposResponse ? reposResponse.data : [];
  const options = repos.map((repo) => {
    const value = {
      uniqueId: repo.id,
      owner: repo.owner.login,
      name: repo.name,
      full_name: repo.full_name,
      ownerType: repo.owner.type,
    };
    return { value, title: repo.name };
  });
  const nextPageRequestData = !repos.length ? null : { page: page + 1 };
  return { options, nextPageRequestData, isPaginated: true };
};

app.post("/fetchRemoteOptions", async function(req, res) {
  const { userId } = req.session;
  const { payload } = req.body;
  const token = await TokenService.getToken(userId);
  const response = await getRepositories(token, payload);
  res.status(200).send(response);
})
```

In the example, we start on page 1 and get batches of 10 items each. The requests will continue until there are no more items to retrieve.

The users' names are the visible options to choose from. `pageRequestData` starts with a value of 1 and will add one to the page number for every new request.

When the response for the options is empty, `nextPageRequestData` is set to `null` and there will be no more requests.

*If fetching your options from an external API, you may need to use cursor pagination instead. Update the contents of "nextPageRequestData" according to the spec of the API.*
