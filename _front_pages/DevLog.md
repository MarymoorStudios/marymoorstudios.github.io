---
order: 3
title: "DevLog"
bg: black
color: white
fa-icon: comments
---
# Posts

<div>
    {% for page in site.posts reverse %}
      {% capture id %}{{ page.id | remove:'/' | downcase }}{% endcapture %}
      <div id="{{id}}" class="section p-{{id}}">
        <div class="container {{ page.style }}">
          {{ page.excerpt }}
        </div>
      </div>
    {% endfor %}
</div>
