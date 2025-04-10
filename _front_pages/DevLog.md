---
order: 3
title: "DevLog"
bg: black
color: white
fa-icon: comments
---
# Recent Posts

<div>
<ul>
  {% for post in site.posts | where: "categories", "devlog" | limit: 3 %}
    <li>
      <a href="{{ post.url }}">{{ post.date | date: "%Y-%m-%d" }} - {{ post.title }}</a>
      <p>{{ post.excerpt | strip }}</p>
    </li>
  {% endfor %}
</ul>
</div>

<div style="text-align: center;">
  <a href="devlog.html">Read More</a>
</div>
