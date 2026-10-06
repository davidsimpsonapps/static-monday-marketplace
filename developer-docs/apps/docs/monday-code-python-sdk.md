---
updatedAt: 2025-10-23T05:19:48.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Python SDK

Install and use the Python SDK for monday code tooling

The Python SDK exposes tools for building apps on the monday code infrastructure and works seamlessly alongside the [monday apps CLI](https://developer.monday.com/apps/docs/command-line-interface-cli). It contains methods to access environment variables, update secure storage, write logs, and more.

This guide will show you how to install and use the SDK. Complete documentation of each method is in the project's README file [here](https://github.com/mondaycom/monday-code-python-sdk?tab=readme-ov-file#documentation-for-api-endpoints).

> 👍 Want to see an example?
>
> Check out our [Python quickstart](https://github.com/mondaycom/monday-code-quickstarts/tree/main/quickstart-python) to see an example app that uses these SDK methods!

# Installation

```shell Shell
pip install monday-code
```

# Usage

```python

import monday_code
from monday_code.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost:59999
# See configuration.py for a list of all supported configuration parameters.
configuration = monday_code.Configuration(
    host = "http://localhost:59999"
)



# Enter a context with an instance of the API client
with monday_code.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = monday_code.EnvironmentVariablesApi(api_client)
    name = 'name_example' # str | 

    try:
        api_response = api_instance.get_environment_variable(name)
        print("The response of EnvironmentVariablesApi->get_environment_variable:\n")
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling EnvironmentVariablesApi->get_environment_variable: %s\n" % e)

```
