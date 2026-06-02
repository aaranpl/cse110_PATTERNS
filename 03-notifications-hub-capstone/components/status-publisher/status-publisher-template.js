export const template = (source) => `
  <h3>${source}</h3>
  <div class="form-row">
    <label for="level-${source}">Level</label>
    <select id="level-${source}" name="level">
      <option value="info">info</option>
      <option value="warn">warn</option>
      <option value="error">error</option>
    </select>

    <label for="msg-${source}">Message (optional)</label>
    <input
      type="text"
      id="msg-${source}"
      name="message"
      placeholder="Leave blank for default"
    />

    <button type="button" data-action="send">Send notification</button>
  </div>
`;
