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
  {% for post in site.posts limit: 3 %}
    <li>
      {{ post.date | date: "%Y-%m-%d" }} - <a href="{{ post.url }}">{{ post.title }}</a>
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
</ul>
</div>

[Read More](devlog.html)
