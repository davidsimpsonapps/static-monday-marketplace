---
updatedAt: 2026-09-06T08:37:05.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the updates APIs

The monday.com [updates](https://developer.monday.com/api-reference/reference/updates) APIs enable you to create, read, update, and delete updates.

The types below are used by the updates queries and mutations, and are not independently queryable.

# Like

An object containing metadata about the update's reactions or likes.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Fields
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        created_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The like's creation date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        creator
      </td>

      <td>
        `User`
      </td>

      <td>
        The user who liked the update.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        creator_id
      </td>

      <td>
        `String`
      </td>

      <td>
        The unique identifier of the user who liked the update.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The like's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        reaction_type
      </td>

      <td>
        `ReactionType`
      </td>

      <td>
        The reaction type.
      </td>

      <td>
        `Clap`  
        `Happy`  
        `Like`  
        `Love`  
        `PlusOne`  
        `Rocks`  
        `Trophy`  
        `Wow`
      </td>
    </tr>

    <tr>
      <td>
        updated_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The like's last updated date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        attribution_entity_ref
      </td>

      <td>
        `String`
      </td>

      <td>
        Reference ID of the entity that created this reaction on behalf of the user (e.g., `agent_{agentId}`). **Only available in versions `2026-04` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        attribution_entity_type
      </td>

      <td>
        `AttributionEntity`
      </td>

      <td>
        The type of entity that created this reaction. **Only available in versions `2026-04` and later.**
      </td>

      <td>
        `AGENT`
      </td>
    </tr>
  </tbody>
</Table>

***

# UpdateMention

An object defining who or what to mention in the update.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The unique identifier of the board, project, team, or user to mention.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type
      </td>

      <td>
        `MentionType!`
      </td>

      <td>
        The type of entity to mention.
      </td>

      <td>
        `Board`  
        `Project`  
        `Team`  
        `User`
      </td>
    </tr>
  </tbody>
</Table>

<br />
