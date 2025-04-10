---
order: 3
title: "DevLog"
bg: black
color: white
fa-icon: comments
---
# Posts

<div>
<ul>
  {% for post in site.posts limit: 3 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul></div>
