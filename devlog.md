---
title: "DevLog"
bg: black
color: white
---
# All Posts

<div>
<ul>
  {% for post in site.posts | where: "categories", "devlog" %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.date | date: "%Y-%m-%d" }} - {{ post.title }}</a>
      <p>{{ post.excerpt | strip }}</p>
    </li>
  {% endfor %}
</ul>
</div>
